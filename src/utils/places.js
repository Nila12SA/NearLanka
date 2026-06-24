const fallbackImages = {
  hotel: require("../../assets/Home-Main-1742X871.jpg"),
  nature: require("../../assets/home-tea-estate.jpg"),
  historical: require("../../assets/historical-sigiriya.jpg"),
  default: require("../../assets/home-mountain-view.jpg"),
};

const localImages = {
  "Point_Pedro_Lighthouse.jpg": require("../../assets/Point_Pedro_Lighthouse.jpg"),
  "manalkadu-title-photo_orig.jpg": require("../../assets/manalkadu-title-photo_orig.jpg"),
  "point-pedro-jafna2.jpg": require("../../assets/point-pedro-jafna2.jpg"),
  "ammu villa.jpg": require("../../assets/ammu villa.jpg"),
  "KBS Golden House.jpg": require("../../assets/KBS Golden House.jpg"),
  "village hotel northern point.jpg": require("../../assets/village hotel northern point.jpg"),
  "nilavarai-well.jpg": require("../../assets/nilavarai-well.jpg"),
  "vallipura vishnu temple.jpg": require("../../assets/vallipura vishnu temple.jpg"),
  "hotel-galle-face.jpg": require("../../assets/Home-Main-1742X871.jpg"),
  "nature-sigiriya.jpg": require("../../assets/nature-sigiriya.jpg"),
  "historical-sigiriya.jpg": require("../../assets/historical-sigiriya.jpg"),
  "historical-temple.jpg": require("../../assets/historical-temple.jpg"),
  "nature-ambuluwawa.jpg": require("../../assets/nature-ambuluwawa.jpg"),
  "nature-little-adams-peak.jpg": require("../../assets/nature-little-adams-peak.jpg"),
};

export function getPlaceImage(image, category) {
  if (typeof image === "number" || (image && typeof image === "object")) {
    return image;
  }

  if (typeof image === "string") {
    if (/^https?:\/\//i.test(image)) return { uri: image };
    if (localImages[image]) return localImages[image];
  }

  return fallbackImages[category] || fallbackImages.default;
}

export function getPlaceId(place) {
  return place?._id || place?.id || place?.name || place?.title;
}

export function normalizePlace(place) {
  if (!place) return null;
  const category = String(place.category || place.type || "place").toLowerCase();
  const distanceKm = Number.isFinite(Number(place.distanceKm))
    ? Number(place.distanceKm)
    : null;

  return {
    ...place,
    id: getPlaceId(place),
    title: place.name || place.title || "Sri Lankan Place",
    name: place.name || place.title || "Sri Lankan Place",
    type: category.toUpperCase(),
    category,
    image: getPlaceImage(place.image, category),
    distanceKm,
    distance:
      distanceKm !== null
        ? `${distanceKm.toFixed(1)} km away`
        : place.distance || place.location || "Sri Lanka",
    location: place.location || "Sri Lanka",
    rating: Number(place.rating || 0).toFixed(1),
    openingHours: place.openingHours || "Hours not available",
    entryFee: place.entryFee || "Fee information not available",
    bestTime: place.bestTime || "Any time",
    description: place.description || "Discover this beautiful Sri Lankan place.",
    amenities: place.amenities || [
      { icon: "wifi", label: "WI-FI", type: "mc" },
      { icon: "parking", label: "PARKING", type: "mc" },
      { icon: "restaurant", label: "DINING", type: "ion" },
    ],
    status: place.openingHours || "Hours available",
    statusActive: true,
  };
}

export const normalizePlaces = (places = []) =>
  places.map(normalizePlace).filter(Boolean);
