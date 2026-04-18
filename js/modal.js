let callback = null;

export function openModal(title, cb) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modalInput").value = "";

  callback = cb;
}

document.getElementById("modalSave").addEventListener("click", () => {
  const value = document.getElementById("modalInput").value;
  if (callback) callback(value);
  closeModal();
});

document.getElementById("modalCancel").addEventListener("click", closeModal);

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
}