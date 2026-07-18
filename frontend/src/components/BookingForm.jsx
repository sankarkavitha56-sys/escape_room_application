import { useState } from "react";
import api from "../services/api";

export default function BookingForm({ teams, rooms, onCreated }) {
  const [teamName, setTeamName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/bookings", { teamName, roomName, startTime, endTime });
      setStartTime(""); setEndTime("");
      onCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create booking");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Book Slot</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Team
        <select value={teamName} onChange={(e) => setTeamName(e.target.value)} required>
          <option value="">Select a team</option>
          {teams.map((t) => (
            <option key={t._id} value={t.teamName}>{t.teamName}</option>
          ))}
        </select>
      </label>
      <label>
        Room
        <select value={roomName} onChange={(e) => setRoomName(e.target.value)} required>
          <option value="">Select a room</option>
          {rooms.map((r) => (
            <option key={r._id} value={r.roomName}>{r.roomName}</option>
          ))}
        </select>
      </label>
      <label>
        Start Time
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
      </label>
      <label>
        End Time
        <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
      </label>
      <button type="submit">Book Slot</button>
    </form>
  );
}
