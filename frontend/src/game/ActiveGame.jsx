import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActiveGame = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/games/${gameId}`,
          {
            withCredentials: true,
          }
        );
        setGame(res.data);
      } catch (err) {
        console.error(err);
        setError("Game not found or you're not authorized.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  if (!username) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#555" }}>
        <h2>You must be logged in to play.</h2>
      </div>
    );
  }

  if (isLoading) {
    return <div style={{ padding: "20px" }}>Loading game...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Game ID: {gameId}</h2>
      <h3>Status: {game.status}</h3>
      {game.winner ? (
        <h1 style={{ color: "green" }}>{game.winner} Wins!</h1>
      ) : (
        <p>Game is in progress...</p>
      )}

      {/* Placeholder boards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginTop: "30px",
        }}
      >
        <div>
          <h4>Opponent's Board</h4>
          <div style={{ width: 200, height: 200, background: "#ddd" }}>
            Board Hidden
          </div>
        </div>
        <div>
          <h4>Your Board</h4>
          <div style={{ width: 200, height: 200, background: "#bbb" }}>
            Board View
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveGame;
