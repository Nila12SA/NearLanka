const express = require("express");
const {
  getAllPlaces,
  getHotelPlaces,
  getNaturePlaces,
  getHistoricalPlaces,
  searchPlaces,
  getNearbyPlaces,
  getPlaceById,
} = require("../controllers/placeController");

const router = express.Router();

router.get("/", getAllPlaces);
router.get("/hotels", getHotelPlaces);
router.get("/nature", getNaturePlaces);
router.get("/historical", getHistoricalPlaces);
router.get("/search", searchPlaces);
router.get("/nearby", getNearbyPlaces);
router.get("/:id", getPlaceById);

module.exports = router;
