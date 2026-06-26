export function isValidCoordinate(value, min, max) {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) && numberValue >= min && numberValue <= max;
}

export function isValidLocation(location) {
  return (
    location &&
    isValidCoordinate(location.latitude, -90, 90) &&
    isValidCoordinate(location.longitude, -180, 180)
  );
}

export function calculateDistanceKm(start, end) {
  if (!isValidLocation(start) || !isValidLocation(end)) return null;

  const earthRadiusKm = 6371;
  const toRadians = (degrees) => (Number(degrees) * Math.PI) / 180;
  const latitudeDifference = toRadians(end.latitude - start.latitude);
  const longitudeDifference = toRadians(end.longitude - start.longitude);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(start.latitude)) *
      Math.cos(toRadians(end.latitude)) *
      Math.sin(longitudeDifference / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function addDistanceToPlaces(places = [], userLocation = null) {
  const canCalculateDistance = isValidLocation(userLocation);

  return places.map((place) => {
    const distanceKm = canCalculateDistance
      ? calculateDistanceKm(userLocation, {
          latitude: place.latitude,
          longitude: place.longitude,
        })
      : null;

    return {
      ...place,
      distanceKm: distanceKm === null ? null : Number(distanceKm.toFixed(1)),
    };
  });
}

export function sortPlacesByNearest(places = []) {
  return [...places].sort(
    (first, second) =>
      (first.distanceKm ?? Infinity) - (second.distanceKm ?? Infinity) ||
      Number(second.rating || 0) - Number(first.rating || 0)
  );
}

export function getPlacesWithDistance(places = [], userLocation = null) {
  const placesWithDistance = addDistanceToPlaces(places, userLocation);
  return isValidLocation(userLocation)
    ? sortPlacesByNearest(placesWithDistance)
    : placesWithDistance;
}
