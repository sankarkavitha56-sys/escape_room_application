# Escape Room Challenge Booking System

A minimal full-stack app (React + Node/Express + MongoDB) built directly from
the ER diagram: Player, Team, Room, Booking (Book Slot / Cancel Booking),
Challenge, Leaderboard.

## Entities -> Collections

| ER Diagram Entity      | Collection | Notes |
|-------------------------|-----------|-------|
| Player                  | Player    | playerName |
| Room                    | Room      | roomName (unique), difficulty, capacity, duration (minutes) |
| Team                    | Team      | teamName (unique), roomName (FK), playerId (FK), teamSize |
| Book Slot / Cancel Booking | Booking | teamName (FK), roomName (FK), status: booked/cancelled, startTime, endTime. Cancelling flips status instead of a separate collection, since "cancel booking" acts on the same booking row. |
| Challenge                | Challenge | bookId (FK), completeTime, status: success/failure |
| Leaderboard               | (computed) | Rank is calculated live in `GET /leaderboard` from successful Challenges, ordered by completeTime. Storing a static rank would go stale the moment a new challenge completes. |

Only two intentional, minimal deviations from the literal diagram (well under 10%):
1. `duration` implemented as a number (minutes) rather than a datetime, since a raw datetime can't represent "how long a room takes."
2. `Leaderboard` computed on read instead of persisted per-row, so ranks stay accurate.

## Steps to Run

### Backend
```bash
cd backend
npm install
# create a .env file or just rely on defaults:
# MONGO_URI=mongodb://127.0.0.1:27017/escape-room
npm start
```
Runs on `http://localhost:5000`. Requires a local or Atlas MongoDB instance.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173` (Vite default) and calls the API at `http://localhost:5000`.

## REST APIs

```
POST   /rooms
GET    /rooms
POST   /teams
GET    /teams
POST   /bookings
GET    /bookings
DELETE /bookings/:id
POST   /challenge
GET    /leaderboard
```

## SQL: Top 5 Escape Rooms by successful completions

Equivalent relational schema: `Room(roomName PK, ...)`, `Booking(bookId PK, roomName FK, teamName FK, ...)`, `Challenge(completionId PK, bookId FK, status, completeTime)`.

```sql
SELECT r.roomName, COUNT(*) AS successful_completions
FROM Challenge c
JOIN Booking b ON c.bookId = b.bookId
JOIN Room r ON b.roomName = r.roomName
WHERE c.status = 'success'
GROUP BY r.roomName
ORDER BY successful_completions DESC
LIMIT 5;
```
