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

  if (data.trips.length === 0) {
    container.innerHTML = "<p>No trips created yet.</p>";
    return;
  }

  data.trips.forEach(trip => {
    const div = document.createElement("div");
    div.classList.add("trip-item");

    if (trip.id === activeTripId) {
      div.classList.add("active-trip");
    }

    div.innerHTML = `
      <strong>${trip.name}</strong>
      <button class="delete-trip">❌</button>
    `;

    // Select Trip
    div.addEventListener("click", () => {
      activeTripId = trip.id;
      renderTrips();
      renderItinerary(trip.id);
    });

    // Delete Trip
    div.querySelector(".delete-trip").addEventListener("click", (e) => {
      e.stopPropagation();

      deleteTrip(trip.id);

      if (activeTripId === trip.id) {
        activeTripId = null;
        document.getElementById("itineraryView").innerHTML = "";
      }

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