const Challenge = require("../models/Challenge");
const Booking = require("../models/Booking");

exports.completeChallenge = async (req, res) => {
  try {
    const { bookId, completeTime, status } = req.body;
    if (!bookId || !completeTime || !status) {
      return res.status(400).json({ error: "bookId, completeTime and status are required" });
    }
    if (!["success", "failure"].includes(status)) {
      return res.status(400).json({ error: "status must be 'success' or 'failure'" });
    }

    const booking = await Booking.findById(bookId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    const challenge = await Challenge.create({ bookId, completeTime, status });
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
