import { fetchCountryData, fetchPhotos } from "./apiService.js";
import { renderCountry } from "./countryInfo.js";
import { renderPhotos } from "./photoGallery.js";

export function initSearch() {
  console.log("initSearch running"); 

  const btn = document.getElementById("searchBtn");
  const input = document.getElementById("searchInput");

  console.log("Elements found:", btn, input); 

  // 🚨 If elements are missing, stop here
  if (!btn || !input) {
    console.error("Search elements not found");
    return;
  }

btn.addEventListener("click", async () => {
  const query = input.value.trim();
  if (!query) return;

  document.getElementById("countryInfo").innerHTML = "Loading...";
  document.getElementById("photoGallery").innerHTML = "Loading photos...";

  try {
    const countryData = await fetchCountryData(query);

    if (countryData) {
      renderCountry(countryData);
    } else {
      document.getElementById("countryInfo").innerHTML = `
        <p>No country data found for "${query}". Showing travel inspiration instead ✈️</p>
      `;
    }

    const photos = await fetchPhotos(query);
    renderPhotos(photos);

  } catch (error) {
    console.error(error);
  }
});

  // ✅ ENTER KEY SUPPORT
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      console.log("ENTER PRESSED");
      btn.click();
    }
  });
}