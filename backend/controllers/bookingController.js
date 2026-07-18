const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const { teamName, roomName, startTime, endTime } = req.body;
    const booking = await Booking.create({
      teamName,
      roomName,
      startTime,
      endTime,
      status: "booked"
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "cancelled"; // frees the slot
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
