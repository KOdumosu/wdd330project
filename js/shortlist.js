import { storageService } from "./storageService.js";
import { addActivity, addDay, renderItinerary } from "./itineraryBuilder.js";
import { getActiveTripId } from "./tripManager.js";

export function addToShortlist(place) {
  const data = storageService.getData();

  const exists = data.shortlist.find(item => item.id === place.id);

  if (!exists) {
    data.shortlist.push(place);
    storageService.saveData(data);
    renderShortlist();
  }
}

export function renderShortlist() {
  const data = storageService.getData();
  const container = document.getElementById("shortlistModal");

  if (!container) return;

  // Empty State
  if (data.shortlist.length === 0) {
    container.innerHTML = "<p>No saved places yet.</p>";
    return;
  }

  container.innerHTML = data.shortlist.map(item => `
    <div class="shortlist-item">
      <span>${item.name}</span>

      <div class="shortlist-actions">
        <button class="add-to-trip" data-id="${item.id}">
          ➕ Trip
        </button>

        <button class="delete-shortlist" data-id="${item.id}">
          ❌
        </button>
      </div>
    </div>
  `).join("");

  // ADD TO TRIP
  document.querySelectorAll(".add-to-trip").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const place = data.shortlist.find(item => item.id === id);

      const tripId = getActiveTripId();

      if (!tripId) {
        alert("Select a trip first!");
        return;
      }

      const trip = data.trips.find(t => t.id === tripId);

      // Auto create Day 1 if none exists
      if (trip.itinerary.length === 0) {
        addDay(tripId);
      }

      // Add to first day
      addActivity(tripId, 0, {
        title: place.name
      });

      renderItinerary(tripId);

      alert("Added to itinerary!");
    });
  });

  // DELETE
  document.querySelectorAll(".delete-shortlist").forEach(btn => {
    btn.addEventListener("click", () => {
      deleteShortlistItem(btn.dataset.id);
    });
  });
}

export function deleteShortlistItem(id) {
  const data = storageService.getData();

  data.shortlist = data.shortlist.filter(item => item.id !== id);

  storageService.saveData(data);

  renderShortlist();
}