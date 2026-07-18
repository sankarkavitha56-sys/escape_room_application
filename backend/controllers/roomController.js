const Room = require("../models/Room");

exports.createRoom = async (req, res) => {
  try {
    const { roomName, difficulty, capacity, duration } = req.body;
    if (!roomName || !difficulty || !capacity || !duration) {
      return res.status(400).json({ error: "roomName, difficulty, capacity and duration are required" });
    }
    const room = await Room.create({ roomName, difficulty, capacity, duration });
    res.status(201).json(room);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Room name must be unique" });
    res.status(500).json({ error: err.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
