import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AllGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // For now, we simulate API data
    setGames([
      {
        _id: "g123",
        creator: "Alice",
        status: "waiting",
        createdAt: "2024-04-18T21:00:00Z",
      },
      {
        _id: "g124",
        creator: "Bob",
        status: "ongoing",
        createdAt: "2024-04-18T21:10:00Z",
      },
      {
        _id: "g125",
        creator: "Carol",
        status: "finished",
        createdAt: "2024-04-18T21:20:00Z",
      },
    ]);

    // Future real API call example:
    // axios.get("http://localhost:3001/api/games").then(res => setGames(res.data));
  }, []);

  return (
    <div>
      <h2>All Games</h2>
      <table border="1" cellPadding="8" style={{ backgroundColor: "white" }}>
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game._id}>
              <td>{game._id}</td>
              <td>{game.creator}</td>
              <td>{game.status}</td>
              <td>{new Date(game.createdAt).toLocaleString()}</td>
              <td>
                {game.status === "waiting" || game.status === "ongoing" ? (
                  <Link to={`/game/${game._id}`}>Join Game</Link>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllGames;
