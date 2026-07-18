const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  completeTime: { type: Date, required: true },
  status: { type: String, enum: ["success", "failure"], required: true }
});

module.exports = mongoose.model("Challenge", challengeSchema);
