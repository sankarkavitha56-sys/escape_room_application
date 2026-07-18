import { useState } from "react";
import api from "../services/api";

export default function ChallengeForm({ bookings, onCreated }) {
  const [bookId, setBookId] = useState("");
  const [completeTime, setCompleteTime] = useState("");
  const [status, setStatus] = useState("success");
  const [error, setError] = useState("");

  const activeBookings = bookings.filter((b) => b.status === "booked");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/challenge", { bookId, completeTime, status });
      setCompleteTime("");
      onCreated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to complete challenge");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Complete Challenge</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Booking
        <select value={bookId} onChange={(e) => setBookId(e.target.value)} required>
          <option value="">Select a booking</option>
          {activeBookings.map((b) => (
            <option key={b._id} value={b._id}>{b.teamName} @ {b.roomName}</option>
          ))}
        </select>
      </label>
      <label>
        Completion Time
        <input type="datetime-local" value={completeTime} onChange={(e) => setCompleteTime(e.target.value)} required />
      </label>
      <label>
        Result
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </label>
      <button type="submit">Submit Result</button>
    </form>
  );
}
