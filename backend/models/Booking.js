const mongoose = require("mongoose");

// Represents "Book Slot". Cancellation is handled via status flipping to
// "cancelled" (frees the slot) rather than a separate collection, since
// Cancel Booking in the ER diagram references the same team/booking data.
const bookingSchema = new mongoose.Schema({
  teamName: { type: String, required: true },  // FK -> Team.teamName
  roomName: { type: String, required: true },  // FK -> Room.roomName
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true }
});

module.exports = mongoose.model("Booking", bookingSchema);
