import { useCallback, useEffect, useState } from "react";
import placesData from "../../backend/data/placesData";
import { getPlacesWithDistance, isValidLocation } from "../utils/distance";
import { filterPlacesByCategory, normalizePlaces } from "../utils/places";

export default function usePlaces({
  category,
  nearby = false,
  hasLocationPermission = true,
  userLocation = null,
} = {}) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usedLocation, setUsedLocation] = useState(false);

  const loadPlaces = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const filteredData = filterPlacesByCategory(placesData, category);
      const locationWasUsed = hasLocationPermission && isValidLocation(userLocation);
      const data = getPlacesWithDistance(
        filteredData,
        locationWasUsed ? userLocation : null
      );

      setPlaces(normalizePlaces(data));
      setUsedLocation(locationWasUsed);
    } catch (loadError) {
      console.error("Unable to load NearLanka places:", loadError);
      setError("We couldn't load places right now.");
      setPlaces([]);
      setUsedLocation(false);
    } finally {
      setLoading(false);
    }
  }, [category, hasLocationPermission, nearby, userLocation]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  return { places, loading, error, reload: loadPlaces, usedLocation };
}
