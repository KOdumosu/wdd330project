export const storageService = {
  getData() {
    return JSON.parse(localStorage.getItem("wanderlens")) || {
      trips: [],
      shortlist: []
    };
  },

  saveData(data) {
    localStorage.setItem("wanderlens", JSON.stringify(data));
  }
};