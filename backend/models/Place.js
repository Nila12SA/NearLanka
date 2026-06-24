const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["hotel", "nature", "historical"],
      required: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    latitude: {
      type: Number,
      required: true,
    },

    longitude: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    openingHours: {
      type: String,
    },

    entryFee: {
      type: String,
    },

    bestTime: {
      type: String,
    },

    distance: {
      type: String,
    },

    sourceUrl: {
      type: String,
    },

    address: {
      type: String,
    },

    contactNumber: {
      type: String,
    },

    facilities: {
      type: [String],
      default: [],
    },

    priceRange: {
      type: String,
    },

    nearbyLandmarks: {
      type: [String],
      default: [],
    },

    travelTip: {
      type: String,
    },

    safetyTip: {
      type: String,
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);