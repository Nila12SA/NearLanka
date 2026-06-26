import * as Location from "expo-location";

export async function getBestAvailableLocation({ requestPermission = false } = {}) {
  const servicesEnabled = await Location.hasServicesEnabledAsync();
  if (!servicesEnabled) {
    throw new Error("Location Services are turned off on this device.");
  }

  let permission = await Location.getForegroundPermissionsAsync();
  if (permission.status !== "granted" && requestPermission && permission.canAskAgain) {
    permission = await Location.requestForegroundPermissionsAsync();
  }

  if (permission.status !== "granted") {
    throw new Error("Location permission was not granted.");
  }

  const lastKnownPosition = await Location.getLastKnownPositionAsync({
    maxAge: 10 * 60 * 1000,
    requiredAccuracy: 2000,
  });

  if (lastKnownPosition) return lastKnownPosition;

  return Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });
}
