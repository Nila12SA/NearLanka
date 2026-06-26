const DEFAULT_API_BASE_URL = "http://172.19.9.86:5000/api";
const STALE_OR_PHONE_UNSAFE_HOSTS = [
  "localhost",
  "127.0.0.1",
  "172.20.65.162",
];

function getApiBaseUrl() {
  const configuredUrl = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (!configuredUrl) return DEFAULT_API_BASE_URL;

  try {
    const { hostname } = new URL(configuredUrl);
    if (STALE_OR_PHONE_UNSAFE_HOSTS.includes(hostname)) {
      console.warn(
        "Ignoring phone-unsafe NearLanka API URL:",
        configuredUrl,
        "Using:",
        DEFAULT_API_BASE_URL
      );
      return DEFAULT_API_BASE_URL;
    }
  } catch (error) {
    console.warn(
      "Ignoring invalid NearLanka API URL:",
      configuredUrl,
      error.message
    );
    return DEFAULT_API_BASE_URL;
  }

  return configuredUrl;
}

export const API_BASE_URL = getApiBaseUrl();

const REQUEST_TIMEOUT_MS = 15000;

async function apiRequest(path) {
  const url = `${API_BASE_URL}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  console.log("NearLanka API request:", url);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      let message = `Request failed with status ${response.status}`;
      try {
        const body = await response.json();
        message = body.message || message;
      } catch {}
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    console.error("NearLanka API request failed:", {
      url,
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    if (error.name === "AbortError") {
      throw new Error(
        `The NearLanka server took too long to respond. Check that your backend is running and reachable at ${url}.`
      );
    }

    throw new Error(
      `Unable to connect to the NearLanka server at ${url}. Make sure your phone and computer are on the same Wi-Fi network and the backend is running.`
    );
  } finally {
    clearTimeout(timeout);
  }
}

export const getAllPlaces = () => apiRequest("/places");
export const getHotels = () => apiRequest("/places/hotels");
export const getNaturePlaces = () => apiRequest("/places/nature");
export const getHistoricalPlaces = () => apiRequest("/places/historical");
export const getPlaceById = (id) => apiRequest(`/places/${encodeURIComponent(id)}`);
export const searchPlaces = (query) => apiRequest(`/places/search?query=${encodeURIComponent(query.trim())}`);
export const getNearbyPlaces = (lat, lng, category) => {
  const params = new URLSearchParams({ lat: String(lat), lng: String(lng) });
  if (category) params.set("category", category);
  return apiRequest(`/places/nearby?${params.toString()}`);
};
