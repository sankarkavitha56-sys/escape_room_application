import { useState } from "react";
import api from "../services/api";

export default function RoomForm({ onCreated }) {
  const [roomName, setRoomName] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [capacity, setCapacity] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/rooms", { roomName, difficulty, capacity: Number(capacity), duration: Number(duration) });
      setRoomName(""); setCapacity(""); setDuration("");
      onCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create room");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Escape Room</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Room Name
        <input value={roomName} onChange={(e) => setRoomName(e.target.value)} required />
      </label>
      <label>
        Difficulty
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </label>
      <label>
        Capacity
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} required min="1" />
      </label>
      <label>
        Duration (minutes)
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required min="1" />
      </label>
      <button type="submit">Create Room</button>
    </form>
  );
}
