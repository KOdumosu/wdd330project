import { addToShortlist } from "./shortlist.js";

export function renderPhotos(photos) {
  const container = document.getElementById("photoGallery");

  if (!photos || photos.length === 0) {
    container.innerHTML = "<p>No photos found</p>";
    return;
  }

  container.innerHTML = photos.map(photo => `
    <div class="photo-card">

      <img src="${photo.urls.small}" alt="${photo.alt_description || 'travel image'}" />

      <div class="photo-info">
        <p><strong>${photo.alt_description || "Beautiful place"}</strong></p>
        <small>By ${photo.user.name}</small>
      </div>

      <button class="save-btn" data-id="${photo.id}">⭐</button>

    </div>
  `).join("");

  // Save to shortlist
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const selected = photos.find(p => p.id === id);

      const place = {
        id: selected.id,
        name: selected.alt_description || "Travel Spot"
      };

      addToShortlist(place);
      alert("Saved to shortlist!");
    });
  });
}