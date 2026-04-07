const REST_COUNTRIES_URL = "https://restcountries.com/v3.1/name/";
const UNSPLASH_URL = "https://api.unsplash.com/search/photos";
const UNSPLASH_API_KEY = "yhNn7ljUk4pEoE5zSpBXRp8KzZtiBo7u7AsTIo_-5L0";

// 🌍 Fetch country data (if it exists)
export async function fetchCountryData(query) {
  try {
    const res = await fetch(
      `${REST_COUNTRIES_URL}${query}?fullText=false`
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();


    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }

    return data[0];

  } catch (error) {
    console.error("Country fetch error:", error);
    return null;
  }
}

// Fetch photos for ANY query (country, city, place)
export async function fetchPhotos(query) {
  try {
    const res = await fetch(
      `${UNSPLASH_URL}?query=${encodeURIComponent(query)}&per_page=9&client_id=${UNSPLASH_API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Photo fetch failed");
    }

    const data = await res.json();

    return data.results || [];

  } catch (error) {
    console.error("Photo fetch error:", error);
    return [];
  }
}

// Combined search 
export async function searchLocation(query) {
  const [countryData, photos] = await Promise.all([
    fetchCountryData(query),
    fetchPhotos(query)
  ]);

  return {
    country: countryData, 
    photos: photos        
  };
}