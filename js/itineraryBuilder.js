import { storageService } from "./storageService.js";

export function renderItinerary(tripId) {
  const data = storageService.getData();
  const trip = data.trips.find(t => t.id === tripId);

  const container = document.getElementById("itineraryView");

  if (!trip || !container) return;

  container.innerHTML = `<h3>${trip.name} Itinerary</h3>`;

  if (trip.itinerary.length === 0) {
    container.innerHTML += "<p>No days added yet.</p>";
  }

  trip.itinerary.forEach((day, dayIndex) => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day-card");

    dayDiv.innerHTML = `
      <h4>
        Day ${day.day}
        <button class="delete-day" data-day="${dayIndex}">❌</button>
      </h4>

      <ul>
        ${day.activities.map((activity, activityIndex) => `
          <li>
            ${activity.title}
            <button class="delete-activity"
              data-day="${dayIndex}"
              data-activity="${activityIndex}">
              ❌
            </button>
          </li>
        `).join("")}
      </ul>

      <button class="add-activity" data-day="${dayIndex}">
        + Add Activity
      </button>
    `;

    container.appendChild(dayDiv);
  });

  // Add Activity
  document.querySelectorAll(".add-activity").forEach(btn => {
    btn.addEventListener("click", () => {
      const dayIndex = btn.dataset.day;
      const title = prompt("Activity name:");

      if (!title) return;

      addActivity(tripId, dayIndex, { title });
      renderItinerary(tripId);
    });
  });

  // Delete Day
  document.querySelectorAll(".delete-day").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteDay(tripId, btn.dataset.day);
      renderItinerary(tripId);
    });
  });

  // Delete Activity
  document.querySelectorAll(".delete-activity").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteActivity(
        tripId,
        btn.dataset.day,
        btn.dataset.activity
      );

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

  renderItinerary(tripId);
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

export function deleteActivity(tripId, dayIndex, activityIndex) {
  const data = storageService.getData();
  const trip = data.trips.find(t => t.id === tripId);

  trip.itinerary[dayIndex].activities.splice(activityIndex, 1);

  storageService.saveData(data);
}