import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/rooms">Rooms</Link>
      <Link to="/teams">Teams</Link>
      <Link to="/bookings">Bookings</Link>
      <Link to="/leaderboard">Leaderboard</Link>
    </nav>
  );
}
