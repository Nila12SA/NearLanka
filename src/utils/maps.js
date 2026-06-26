import { Alert, Linking, Platform } from "react-native";
import { getBestAvailableLocation } from "./location";

function readCoordinates(place) {
  const latitude = Number(place?.latitude);
  const longitude = Number(place?.longitude);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude) ||
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return { latitude, longitude };
}

export async function openDirections(place, { preferGoogleMaps = false } = {}) {
  const destination = readCoordinates(place);

  if (!destination) {
    Alert.alert(
      "Coordinates unavailable",
      "This place does not have valid latitude and longitude coordinates."
    );
    return;
  }

  let origin;

  try {
    const position = await getBestAvailableLocation({ requestPermission: true });
    origin = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  } catch (error) {
    console.error("Unable to get the route starting point:", error);
    Alert.alert(
      "Current location unavailable",
      "NearLanka needs your current GPS location to generate directions. Enable Location Services and Precise Location, then try again.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => Linking.openSettings() },
      ]
    );
    return;
  }

  const originCoordinates = `${origin.latitude},${origin.longitude}`;
  const destinationCoordinates = `${destination.latitude},${destination.longitude}`;

  // Coordinate-only URLs prevent Maps from geocoding a broad location name.
  const appleMapsUrl =
    `http://maps.apple.com/?saddr=${encodeURIComponent(originCoordinates)}` +
    `&daddr=${encodeURIComponent(destinationCoordinates)}&dirflg=d`;

  const googleMapsUrl =
    "https://www.google.com/maps/dir/?api=1" +
    `&origin=${encodeURIComponent(originCoordinates)}` +
    `&destination=${encodeURIComponent(destinationCoordinates)}` +
    "&travelmode=driving&dir_action=navigate";

  const platformUrl = preferGoogleMaps
    ? googleMapsUrl
    : Platform.OS === "ios"
      ? appleMapsUrl
      : googleMapsUrl;

  try {
    const supported = await Linking.canOpenURL(platformUrl);

    if (!supported) {
      throw new Error("No supported maps application is available.");
    }

    await Linking.openURL(platformUrl);
  } catch (error) {
    console.error("Unable to open turn-by-turn directions:", error);
    Alert.alert(
      "Maps unavailable",
      "NearLanka could not open directions on this device."
    );
  }
}

// Preserve existing imports used by the current detail and map screens.
export const openPlaceDirections = openDirections;
export const openGoogleMapsDirections = (place) =>
  openDirections(place, { preferGoogleMaps: true });
export const openPlaceInMaps = openDirections;
