export const API_BASE_URL = "http://172.20.10.8:5000/api";

const REQUEST_TIMEOUT_MS = 12000;

async function apiRequest(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`;
      try {
        const body = await response.json();
        message = body.message || message;
      } catch {
        // Keep the status-based message when the response is not JSON.
      }
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("The NearLanka server took too long to respond.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const getAllPlaces = () => apiRequest("/places");
export const getHotels = () => apiRequest("/places/hotels");
export const getNaturePlaces = () => apiRequest("/places/nature");
export const getHistoricalPlaces = () => apiRequest("/places/historical");
export const getPlaceById = (id) =>
  apiRequest(`/places/${encodeURIComponent(id)}`);
export const searchPlaces = (query) =>
  apiRequest(`/places/search?query=${encodeURIComponent(query.trim())}`);
export const getNearbyPlaces = (lat, lng, category) => {
  const params = new URLSearchParams({ lat: String(lat), lng: String(lng) });
  if (category) params.set("category", category);
  return apiRequest(`/places/nearby?${params.toString()}`);
};
