const Team = require("../models/Team");
const Room = require("../models/Room");
const Player = require("../models/Player");

exports.createTeam = async (req, res) => {
  try {
    const { teamName, roomName, playerName, teamSize } = req.body;
    if (!teamName || !roomName || !playerName || !teamSize) {
      return res.status(400).json({ error: "teamName, roomName, playerName and teamSize are required" });
    }

    const room = await Room.findOne({ roomName });
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (teamSize > room.capacity) {
      return res.status(400).json({ error: "Team size cannot exceed room capacity" });
    }

    const existing = await Team.findOne({ teamName });
    if (existing) return res.status(400).json({ error: "Team name must be unique" });

    // Player joins a team -> create (or reuse) the player record
    let player = await Player.findOne({ playerName });
    if (!player) player = await Player.create({ playerName });

    const team = await Team.create({ teamName, roomName, playerId: player._id, teamSize });
    res.status(201).json(team);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Team name must be unique" });
    res.status(500).json({ error: err.message });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("playerId");
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
