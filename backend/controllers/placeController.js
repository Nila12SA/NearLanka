const mongoose = require("mongoose");
const Place = require("../models/Place");

// Escape special characters before using user input in a regular expression.
const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find().sort({ name: 1 });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Unable to get places" });
  }
};

const getPlacesByCategory = (category) => async (req, res) => {
  try {
    const places = await Place.find({ category }).sort({ name: 1 });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: `Unable to get ${category} places` });
  }
};

const searchPlaces = async (req, res) => {
  try {
    const query = req.query.query?.trim();

    if (!query) {
      return res
        .status(400)
        .json({ message: "Please provide a search query" });
    }

    const searchExpression = new RegExp(escapeRegex(query), "i");
    const places = await Place.find({
      $or: [
        { name: searchExpression },
        { location: searchExpression },
        { category: searchExpression },
        { description: searchExpression },
      ],
    }).sort({ name: 1 });

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Unable to search places" });
  }
};

// Calculate the straight-line distance between two coordinates in kilometres.
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const earthRadiusKm = 6371;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latitudeDifference = toRadians(lat2 - lat1);
  const longitudeDifference = toRadians(lng2 - lng1);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(longitudeDifference / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getNearbyPlaces = async (req, res) => {
  try {
    const latitudeText = req.query.lat?.trim();
    const longitudeText = req.query.lng?.trim();
    const latitude = Number(latitudeText);
    const longitude = Number(longitudeText);
    const category = req.query.category?.trim().toLowerCase();
    const allowedCategories = ["hotel", "nature", "historical"];

    if (
      !latitudeText ||
      !longitudeText ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        message: "Please provide valid lat and lng query parameters",
      });
    }

    if (category && !allowedCategories.includes(category)) {
      return res.status(400).json({
        message: "Category must be hotel, nature, or historical",
      });
    }

    const filter = category ? { category } : {};
    const places = await Place.find(filter);
    const nearbyPlaces = places
      .map((place) => ({
        ...place.toObject(),
        distanceKm: Number(
          calculateDistance(
            latitude,
            longitude,
            place.latitude,
            place.longitude
          ).toFixed(2)
        ),
      }))
      .sort((firstPlace, secondPlace) => {
        return firstPlace.distanceKm - secondPlace.distanceKm;
      });

    res.status(200).json(nearbyPlaces);
  } catch (error) {
    res.status(500).json({ message: "Unable to get nearby places" });
  }
};

const getPlaceById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid place ID" });
    }

    const place = await Place.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: "Unable to get the place" });
  }
};

module.exports = {
  getAllPlaces,
  getHotelPlaces: getPlacesByCategory("hotel"),
  getNaturePlaces: getPlacesByCategory("nature"),
  getHistoricalPlaces: getPlacesByCategory("historical"),
  searchPlaces,
  getNearbyPlaces,
  getPlaceById,
};


