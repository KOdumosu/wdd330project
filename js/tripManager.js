import { storageService } from "./storageService.js";
import { renderItinerary } from "./itineraryBuilder.js";

let activeTripId = null;

export function createTrip(trip) {
  const data = storageService.getData();
  data.trips.push(trip);
  storageService.saveData(data);
}

export function renderTrips() {
  const data = storageService.getData();
  const container = document.getElementById("tripList");

  if (!container) return;

  container.innerHTML = "";

  data.trips.forEach(trip => {
    const div = document.createElement("div");
   div.classList.add("trip-item");

if (trip.id === activeTripId) {
  div.classList.add("active-trip");
}

    div.innerHTML = `
      <strong>${trip.name}</strong>
      ${trip.id === activeTripId ? "[Active]" : ""}
      <button class="delete-trip" data-id="${trip.id}">Delete</button>
    `;

    div.addEventListener("click", () => {
      activeTripId = trip.id;
      renderTrips();
      renderItinerary(trip.id);
    });

    div.querySelector(".delete-trip").addEventListener("click", (e) => {
  e.stopPropagation(); // 🔥 prevent selecting trip
  deleteTrip(trip.id);
  renderTrips();
});

    container.appendChild(div);
  });
}

export function getActiveTripId() {
  return activeTripId;
}

export function deleteTrip(tripId) {
  const data = storageService.getData();
  data.trips = data.trips.filter(t => t.id !== tripId);
  storageService.saveData(data);
}