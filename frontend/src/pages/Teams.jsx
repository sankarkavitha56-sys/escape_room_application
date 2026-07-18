import { useEffect, useState } from "react";
import api from "../services/api";
import TeamForm from "../components/TeamForm";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [rooms, setRooms] = useState([]);

  const loadTeams = async () => {
    const res = await api.get("/teams");
    setTeams(res.data);
  };
  const loadRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => { loadTeams(); loadRooms(); }, []);

  return (
    <div className="container">
      <h1>Teams</h1>
      <TeamForm rooms={rooms} onCreated={loadTeams} />
      <table>
        <thead>
          <tr><th>Team Name</th><th>Room</th><th>Player</th><th>Team Size</th></tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t._id}>
              <td>{t.teamName}</td>
              <td>{t.roomName}</td>
              <td>{t.playerId?.playerName}</td>
              <td>{t.teamSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
