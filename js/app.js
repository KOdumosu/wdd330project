import { initSearch } from "./searchBar.js";
import { renderShortlist } from "./shortlist.js";
import { createTrip, renderTrips } from "./tripManager.js";
import { addDay } from "./itineraryBuilder.js";
import { getActiveTripId } from "./tripManager.js";

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  renderTrips();

  document.getElementById("createTripBtn")?.addEventListener("click", () => {
    const name = prompt("Trip name:");
    if (!name) return;

    createTrip({
      id: Date.now().toString(),
      name,
      itinerary: []
    });

    renderTrips();
  });

  document.getElementById("addDayBtn")?.addEventListener("click", () => {
    const tripId = getActiveTripId();
    if (!tripId) return alert("Select a trip first!");

    addDay(tripId);
  });

  document.getElementById("openShortlist")?.addEventListener("click", () => {
    document.getElementById("shortlistModal").classList.toggle("hidden");
    renderShortlist();
  });
});