import { initSearch } from "./searchBar.js";
import { renderShortlist } from "./shortlist.js";
import { createTrip, renderTrips, getActiveTripId } from "./tripManager.js";
import { addDay } from "./itineraryBuilder.js";

document.addEventListener("DOMContentLoaded", () => {
  // SEARCH
  initSearch();

  // LOAD DATA
  renderTrips();
  renderShortlist();

  // CREATE TRIP
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

  // ADD DAY
  document.getElementById("addDayBtn")?.addEventListener("click", () => {
    const tripId = getActiveTripId();

    if (!tripId) {
      alert("Select a trip first!");
      return;
    }

    addDay(tripId);
  });

  // OPEN SHORTLIST
  document.getElementById("openShortlist")?.addEventListener("click", () => {
    document.getElementById("shortlistModal")?.classList.toggle("hidden");
    renderShortlist();
  });
});