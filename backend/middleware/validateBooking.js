const Room = require("../models/Room");
const Team = require("../models/Team");
const Booking = require("../models/Booking");

async function validateBooking(req, res, next) {
  try {
    const { teamName, roomName, startTime, endTime } = req.body;

    if (!teamName || !roomName || !startTime || !endTime) {
      return res.status(400).json({ error: "teamName, roomName, startTime and endTime are required" });
    }

    const team = await Team.findOne({ teamName });
    if (!team) return res.status(404).json({ error: "Team not found" });

    const room = await Room.findOne({ roomName });
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (team.teamSize > room.capacity) {
      return res.status(400).json({ error: "Team size exceeds room capacity" });
    }

    // Prevent duplicate active booking for same team in same room
    const duplicate = await Booking.findOne({ teamName, roomName, status: "booked" });
    if (duplicate) {
      return res.status(400).json({ error: "This team already has an active booking for this room" });
    }

    // Prevent slot conflict: overlapping active booking in same room
    const newStart = new Date(startTime);
    const newEnd = new Date(endTime);
    const conflict = await Booking.findOne({
      roomName,
      status: "booked",
      startTime: { $lt: newEnd },
      endTime: { $gt: newStart }
    });
    if (conflict) {
      return res.status(400).json({ error: "Slot conflict: room already booked for this time range" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = validateBooking;
