import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <h1>Escape Room Challenge Booking System</h1>
      <p>
        A gaming company needs a system for students/players to view escape
        rooms, form teams, book slots, complete challenges, and view
        leaderboards. Each room has capacity, time slots, duration, and
        difficulty level.
      </p>

      <div className="home-links">
        <Link to="/rooms">
          <button>1. Create Escape Room</button>
        </Link>
        <Link to="/teams">
          <button>2. Create Team</button>
        </Link>
        <Link to="/bookings">
          <button>3. Book Slot</button>
        </Link>
        <Link to="/bookings">
          <button>4. Cancel Booking</button>
        </Link>
        <Link to="/bookings">
          <button>5. Complete Challenge</button>
        </Link>
        <Link to="/leaderboard">
          <button>6. Leaderboard</button>
        </Link>
      </div>
    </div>
  );
}
