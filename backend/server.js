const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const roomRoutes = require("./routes/roomRoutes");
const teamRoutes = require("./routes/teamRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/rooms", roomRoutes);
app.use("/teams", teamRoutes);
app.use("/bookings", bookingRoutes);
app.use("/challenge", challengeRoutes);
app.use("/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/escape-room";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
