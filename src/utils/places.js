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
  "Muthurajawela-Wetlands.jpg": require("../../assets/Muthurajawela-Wetlands.jpg"),
  "diyatha-uyana.jpg": require("../../assets/diyatha-uyana.jpg"),
  "beddagama wetland park.jpg": require("../../assets/beddagama wetland park.jpg"),
  "independence memorial hall.jpg": require("../../assets/independence memorial hall.jpg"),
  "national-museum.jpg": require("../../assets/national-museum.jpg"),
  "Colombo-Dutch-Museum.jpg": require("../../assets/Colombo-Dutch-Museum.jpg"),
  "Wolvendaal-Church-585x343.jpg": require("../../assets/Wolvendaal-Church-585x343.jpg"),
  "pegasus reef hotel.jpg": require("../../assets/pegasus reef hotel.jpg"),
  "crow-island-beach-park.jpg": require("../../assets/crow-island-beach-park.jpg"),
  "forever city hotel.jpg": require("../../assets/forever city hotel.jpg"),
  "kelaniya raja maha vihara.jpg": require("../../assets/kelaniya raja maha vihara.jpg"),
  "kelani river.jpg": require("../../assets/kelani river.jpg"),
  "relax-on-plus-kelaniya.jpg": require("../../assets/relax-on-plus-kelaniya.jpg"),
  "hotel-clarion.jpg": require("../../assets/hotel-clarion.jpg"),
  "hotel royal grand paradise.jpg": require("../../assets/hotel royal grand paradise.jpg"),
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

export function isPlaceOpenNow(place) {
  if (typeof place?.isOpenNow === "boolean") return place.isOpenNow;
  const hours = String(place?.openingHours || "").toLowerCase();

  if (
    !hours ||
    hours.includes("check") ||
    hours.includes("unavailable") ||
    hours.includes("closed")
  ) {
    return false;
  }

  return (
    hours.includes("open 24") ||
    hours.includes("open daily") ||
    hours.includes("morning and evening")
  );
}

export function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function editDistance(first, second) {
  if (first === second) return 0;
  if (!first.length) return second.length;
  if (!second.length) return first.length;

  const previous = Array.from({ length: second.length + 1 }, (_, index) => index);

  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    const current = [firstIndex];

    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      const substitutionCost =
        first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1;
      current[secondIndex] = Math.min(
        current[secondIndex - 1] + 1,
        previous[secondIndex] + 1,
        previous[secondIndex - 1] + substitutionCost
      );
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[second.length];
}

function wordMatchesQuery(queryWord, candidateWord) {
  if (!queryWord || !candidateWord) return false;

  if (candidateWord.includes(queryWord)) {
    return true;
  }

  if (
    queryWord === `${candidateWord}s` ||
    candidateWord === `${queryWord}s`
  ) {
    return true;
  }

  if (queryWord.length < 4 || candidateWord.length < 4) {
    return false;
  }

  const tolerance = queryWord.length <= 5 ? 1 : 2;
  return editDistance(queryWord, candidateWord) <= tolerance;
}

export function filterPlacesByQuery(places = [], query = "") {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) return places;

  const queryWords = normalizedQuery.split(" ").filter(Boolean);

  return places.filter((place) => {
    const searchableText = normalizeSearchText(
      [
        place.title,
        place.name,
        place.location,
        place.category,
        place.type,
        place.description,
        place.openingHours,
        ...(place.tags || []),
      ].join(" ")
    );

    if (searchableText.includes(normalizedQuery)) return true;

    const candidateWords = searchableText.split(" ").filter(Boolean);
    return queryWords.every((queryWord) =>
      candidateWords.some((candidateWord) =>
        wordMatchesQuery(queryWord, candidateWord)
      )
    );
  });
}

const categoryAliases = {
  all: "All",
  hotel: "hotel",
  hotels: "hotel",
  nature: "nature",
  natural: "nature",
  historical: "historical",
  history: "historical",
};

export function normalizeCategoryFilter(category = "All") {
  const key = normalizeSearchText(category);
  return categoryAliases[key] || "All";
}

export function filterPlacesByCategory(places = [], category = "All") {
  const normalizedCategory = normalizeCategoryFilter(category);
  if (normalizedCategory === "All") return places;

  return places.filter((place) => {
    const placeCategory = normalizeCategoryFilter(place.category || place.type);
    return placeCategory === normalizedCategory;
  });
}

function getDistanceLimit(maxDistanceKm) {
  if (maxDistanceKm === null || maxDistanceKm === undefined || maxDistanceKm === "") {
    return null;
  }

  const distanceLimit = Number(maxDistanceKm);
  return Number.isFinite(distanceLimit) ? distanceLimit : null;
}

export function sortPlacesByFilter(places = [], filter = "Nearest") {
  const normalizedFilter = normalizeSearchText(filter);
  const sortedPlaces = [...places];

  if (normalizedFilter === "top rated") {
    return sortedPlaces.sort(
      (first, second) =>
        Number(second.rating || 0) - Number(first.rating || 0) ||
        (first.distanceKm ?? Infinity) - (second.distanceKm ?? Infinity)
    );
  }

  return sortedPlaces.sort(
    (first, second) =>
      (first.distanceKm ?? Infinity) - (second.distanceKm ?? Infinity) ||
      Number(second.rating || 0) - Number(first.rating || 0)
  );
}

export function filterAndSortPlaces(
  places = [],
  { query = "", category = "All", sort = "Nearest", maxDistanceKm = null } = {}
) {
  const distanceLimit = getDistanceLimit(maxDistanceKm);
  const distanceFiltered = distanceLimit !== null
    ? places.filter(
        (place) => place.distanceKm === null || place.distanceKm <= distanceLimit
      )
    : places;

  const categoryFiltered = filterPlacesByCategory(distanceFiltered, category);
  const queryFiltered = filterPlacesByQuery(categoryFiltered, query);
  const openFiltered = normalizeSearchText(sort) === "open now"
    ? queryFiltered.filter(isPlaceOpenNow)
    : queryFiltered;

  return sortPlacesByFilter(openFiltered, sort);
}
export function filterCategoryPlaces(
  places = [],
  activeFilter = "All",
  maxDistanceKm = 10
) {
  const distanceLimit = getDistanceLimit(maxDistanceKm);
  const nearbyPlaces = distanceLimit !== null
    ? places.filter(
        (place) => place.distanceKm === null || place.distanceKm <= distanceLimit
      )
    : places;

  if (activeFilter === "Open Now") {
    return nearbyPlaces.filter(isPlaceOpenNow);
  }

  if (activeFilter === "Top Rated") {
    return [...nearbyPlaces]
      .filter((place) => Number(place.rating) >= 4.5)
      .sort(
        (first, second) =>
          Number(second.rating) - Number(first.rating) ||
          (first.distanceKm ?? Infinity) - (second.distanceKm ?? Infinity)
      );
  }

  return nearbyPlaces;
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
    reviews: place.reviews || "No reviews yet",
    amenities: place.amenities || [
      { icon: "wifi", label: "WI-FI", type: "mc" },
      { icon: "parking", label: "PARKING", type: "mc" },
      { icon: "restaurant", label: "DINING", type: "ion" },
    ],
    status: isPlaceOpenNow(place)
      ? "Open Now"
      : place.openingHours || "Hours unavailable",
    statusActive: isPlaceOpenNow(place),
  };
}

export const normalizePlaces = (places = []) =>
  places.map(normalizePlace).filter(Boolean);

