import { useState } from "react";
import api from "../services/api";

export default function TeamForm({ rooms, onCreated }) {
  const [teamName, setTeamName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/teams", { teamName, roomName, playerName, teamSize: Number(teamSize) });
      setTeamName(""); setPlayerName(""); setTeamSize("");
      onCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create team");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Team</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Team Name (unique)
        <input value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
      </label>
      <label>
        Room
        <select value={roomName} onChange={(e) => setRoomName(e.target.value)} required>
          <option value="">Select a room</option>
          {rooms.map((r) => (
            <option key={r._id} value={r.roomName}>{r.roomName} (cap {r.capacity})</option>
          ))}
        </select>
      </label>
      <label>
        Player Name
        <input value={playerName} onChange={(e) => setPlayerName(e.target.value)} required />
      </label>
      <label>
        Team Size
        <input type="number" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} required min="1" />
      </label>
      <button type="submit">Create Team</button>
    </form>
  );
}
