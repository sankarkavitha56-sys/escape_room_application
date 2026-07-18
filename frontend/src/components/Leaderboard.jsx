export default function Leaderboard({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team</th>
          <th>Room</th>
          <th>Completion Time</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.rank}>
            <td>{row.rank}</td>
            <td>{row.teamName}</td>
            <td>{row.roomName}</td>
            <td>{new Date(row.completeTime).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
