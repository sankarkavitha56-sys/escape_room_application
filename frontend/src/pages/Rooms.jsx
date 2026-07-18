import { useEffect, useState } from "react";
import api from "../services/api";
import RoomForm from "../components/RoomForm";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => { loadRooms(); }, []);

  return (
    <div className="container">
      <h1>Rooms</h1>
      <RoomForm onCreated={loadRooms} />
      <table>
        <thead>
          <tr><th>Name</th><th>Difficulty</th><th>Capacity</th><th>Duration (min)</th></tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r._id}>
              <td>{r.roomName}</td>
              <td>{r.difficulty}</td>
              <td>{r.capacity}</td>
              <td>{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
