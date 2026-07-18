const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  difficulty: { type: String, required: true },
  capacity: { type: Number, required: true },
  duration: { type: Number, required: true } // duration in minutes
});

module.exports = mongoose.model("Room", roomSchema);
