const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Place = require("./models/Place");
const places = require("./data/placesData");

dotenv.config();

const seedPlaces = async () => {
  let exitCode = 0;

  try {
    await connectDB();
    await Place.deleteMany();
    await Place.insertMany(places);

    console.log(`Seed completed successfully: ${places.length} places added`);
  } catch (error) {
    exitCode = 1;
    console.error(`Seed failed: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    process.exit(exitCode);
  }
};

seedPlaces();
