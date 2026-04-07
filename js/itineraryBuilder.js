import { storageService } from "./storageService.js";

export function renderItinerary(tripId) {
  const data = storageService.getData();
  const trip = data.trips.find(t => t.id === tripId);

  const container = document.getElementById("itineraryView");
  if (!trip || !container) return;

  container.innerHTML = `<h3>ITINERARY: ${trip.name}</h3>`;

  trip.itinerary.forEach((day, index) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-card"); 

    dayDiv.innerHTML = `
      <h4>Day ${day.day}</h4>
      <ul>
        ${day.activities.map(a => `<li>${a.title}</li>`).join("")}
      </ul>
      <button class="add-activity" data-day="${index}">Add</button>
    `;

    container.appendChild(dayDiv);
  });

  // Add activity event
  document.querySelectorAll(".add-activity").forEach(btn => {
    btn.addEventListener("click", () => {
      const dayIndex = btn.dataset.day;
      const title = prompt("Activity name:");

      if (!title) return;

      addActivity(tripId, dayIndex, { title });
      renderItinerary(tripId);
    });
  });
}

export function addDay(tripId) {
  const data = storageService.getData();
  const trip = data.trips.find(t => t.id === tripId);

  trip.itinerary.push({
    day: trip.itinerary.length + 1,
    activities: []
  });

  storageService.saveData(data);
}

export function deleteDay(tripId, dayIndex) {
  const data = storageService.getData();
  const trip = data.trips.find(t => t.id === tripId);

  trip.itinerary.splice(dayIndex, 1);

  storageService.saveData(data);
}

export function addActivity(tripId, dayIndex, activity) {
  const data = storageService.getData();
  const trip = data.trips.find(t => t.id === tripId);

  trip.itinerary[dayIndex].activities.push(activity);

  storageService.saveData(data);
}