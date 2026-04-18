import { addToShortlist } from "./shortlist.js";

export function renderPhotos(photos) {
  const container = document.getElementById("photoGallery");

  if (!photos || photos.length === 0) {
    container.innerHTML = "<p>No photos found.</p>";
    return;
  }

  container.innerHTML = photos.map(photo => `
    <div class="photo-card">

      <img 
        src="${photo.urls.small}" 
        alt="${photo.alt_description || 'Travel destination'}"
      />

      <div class="photo-info">
        <h4>
          ${formatText(photo.alt_description)}
        </h4>

        <p>
          📷 ${photo.user.name}
        </p>
      </div>

      <button class="save-btn" data-id="${photo.id}">
        ⭐ Save
      </button>

    </div>
  `).join("");

  // Save Button
  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;

      const selected = photos.find(photo => photo.id === id);

      const place = {
        id: selected.id,
        name: selected.alt_description || "Travel Spot"
      };

      addToShortlist(place);

      btn.innerText = "✓ Saved";
      btn.disabled = true;
    });
  });
}

// Clean Titles
function formatText(text) {
  if (!text) return "Beautiful Destination";

  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}