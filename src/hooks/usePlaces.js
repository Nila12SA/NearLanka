import { useCallback, useEffect, useState } from "react";
import { getBestAvailableLocation } from "../utils/location";
import {
  getAllPlaces,
  getHistoricalPlaces,
  getHotels,
  getNaturePlaces,
  getNearbyPlaces,
} from "../api/api";
import { normalizePlaces } from "../utils/places";

const categoryLoaders = {
  hotel: getHotels,
  nature: getNaturePlaces,
  historical: getHistoricalPlaces,
};

export default function usePlaces({
  category,
  nearby = false,
  hasLocationPermission = true,
} = {}) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [usedLocation, setUsedLocation] = useState(false);

  const loadPlaces = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      let data;
      let locationWasUsed = false;

      if (nearby && hasLocationPermission) {
        try {
          const position = await getBestAvailableLocation();
          data = await getNearbyPlaces(
            position.coords.latitude,
            position.coords.longitude,
            category
          );
          locationWasUsed = true;
        } catch (locationError) {
          console.warn(
            "Current location unavailable; loading regular places instead:",
            locationError.message
          );
        }
      }

      if (!data) {
        data = category ? await categoryLoaders[category]() : await getAllPlaces();
      }

      setPlaces(normalizePlaces(data));
      setUsedLocation(locationWasUsed);
    } catch (loadError) {
      console.error("Unable to load NearLanka places:", loadError);
      setError(
        "We couldn't load places right now. Please check that the NearLanka backend is running and your phone is on the same Wi-Fi as this computer."
      );
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  }, [category, hasLocationPermission, nearby]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  return { places, loading, error, reload: loadPlaces, usedLocation };
}
