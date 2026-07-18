import { useEffect, useState } from "react";
import api from "../services/api";
import BookingForm from "../components/BookingForm";
import ChallengeForm from "../components/ChallengeForm";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [teams, setTeams] = useState([]);
  const [rooms, setRooms] = useState([]);

  const loadBookings = async () => {
    const res = await api.get("/bookings");
    setBookings(res.data);
  };
  const loadTeams = async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  };
  const loadRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => { loadBookings(); loadTeams(); loadRooms(); }, []);

  const handleCancel = async (id) => {
    await api.delete(`/bookings/${id}`);
    loadBookings();
  };

  return (
    <div className="container">
      <h1>Bookings</h1>
      <BookingForm teams={teams} rooms={rooms} onCreated={loadBookings} />
      <table>
        <thead>
          <tr><th>Team</th><th>Room</th><th>Start</th><th>End</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.teamName}</td>
              <td>{b.roomName}</td>
              <td>{new Date(b.startTime).toLocaleString()}</td>
              <td>{new Date(b.endTime).toLocaleString()}</td>
              <td>{b.status}</td>
              <td>
                {b.status === "booked" && (
                  <button className="cancel-btn" onClick={() => handleCancel(b._id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChallengeForm bookings={bookings} onCreated={loadBookings} />
    </div>
  );
}
