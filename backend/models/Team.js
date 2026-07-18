const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  roomName: { type: String, required: true }, // FK -> Room.roomName
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  teamSize: { type: Number, required: true }
});

module.exports = mongoose.model("Team", teamSchema);
