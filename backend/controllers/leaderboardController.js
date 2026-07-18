const Challenge = require("../models/Challenge");
const Booking = require("../models/Booking");

// Ranks teams by: successful completion first, then fastest completion time.
exports.getLeaderboard = async (req, res) => {
  try {
    const successfulChallenges = await Challenge.find({ status: "success" })
      .populate("bookId")
      .sort({ completeTime: 1 });

    const leaderboard = successfulChallenges
      .filter(c => c.bookId) // guard against orphaned bookings
      .map((c, index) => ({
        rank: index + 1,
        teamName: c.bookId.teamName,
        roomName: c.bookId.roomName,
        completeTime: c.completeTime,
        status: c.status
      }));

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
