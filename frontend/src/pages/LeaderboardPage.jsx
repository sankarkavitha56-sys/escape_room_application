import { useEffect, useState } from "react";
import api from "../services/api";
import Leaderboard from "../components/Leaderboard";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/leaderboard").then((res) => setData(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Leaderboard</h1>
      <Leaderboard data={data} />
    </div>
  );
}
