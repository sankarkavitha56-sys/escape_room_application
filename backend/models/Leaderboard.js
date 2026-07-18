const mongoose = require("mongoose");

// Kept to satisfy the ER diagram entity. Rank is computed dynamically in
// leaderboardController (rank changes as new challenges complete), so
// this collection is not written to by default.
const leaderboardSchema = new mongoose.Schema({
  completionId: { type: mongoose.Schema.Types.ObjectId, ref: "Challenge", required: true },
  rank: { type: Number, required: true }
});

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
