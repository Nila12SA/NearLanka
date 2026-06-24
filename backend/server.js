const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const placeRoutes = require("./routes/placeRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NearLanka backend is running");
});

app.use("/api/places", placeRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`NearLanka backend running on port ${PORT}`);
  });
};

startServer();
