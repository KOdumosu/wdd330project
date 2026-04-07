import { storageService } from "./storageService.js";
import { addActivity } from "./itineraryBuilder.js";
import { getActiveTripId } from "./tripManager.js";

export function addToShortlist(place) {
  const data = storageService.getData();

  if (!data.shortlist.find(p => p.id === place.id)) {
    data.shortlist.push(place);
    storageService.saveData(data);
  }
}

export function renderShortlist() {
  const data = storageService.getData();
  const container = document.getElementById("shortlistModal");

  if (!container) return;

  container.innerHTML = data.shortlist.map(item => `
  <div class="shortlist-item">
    <span>${item.name}</span>
    <button class="add-to-trip" data-id="${item.id}">Add</button>
  </div>
`).join("");


  document.querySelectorAll(".add-to-trip").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const place = data.shortlist.find(p => p.id === id);

      const tripId = getActiveTripId();
      if (!tripId) {
        alert("Select a trip first!");
        return;
      }

      addActivity(tripId, 0, { title: place.name });
      alert("Added to itinerary!");
    });
  });
}