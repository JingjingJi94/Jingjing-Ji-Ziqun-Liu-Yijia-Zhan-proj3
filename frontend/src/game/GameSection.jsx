import React from "react";
import { Link } from "react-router-dom";

const GameSection = ({ title, games, type, username }) => {
  if (!games || games.length === 0) return null;

  return (
    <section style={{ marginBottom: "20px" }}>
      <h3>{title}</h3>
      <>
        {games.map((game) => {
          const opponent =
            game.player1?.username === username
              ? game.player2?.username
              : game.player1?.username;

          return (
            <li
              key={game.gameId || game._id}
              style={{ listStyleType: "none", paddingLeft: 0 }}
            >
              {type === "other" ? (
                <>
                  <Link to={`/game/${game.gameId}`}>
                    Game ID: {game.gameId}
                  </Link>{" "}
                  — Players: {game.player1?.username || "?"} vs{" "}
                  {game.player2?.username || "?"} — Start:{" "}
                  {new Date(game.startTime).toLocaleString()}
                  {game.gameStatus === "Completed" && (
                    <>
                      — End: {new Date(game.EndTime).toLocaleString()} — Winner:{" "}
                      {game.winner?.username || "N/A"}
                    </>
                  )}
                </>
              ) : type === "completed" ? (
                <>
                  Game ID:{" "}
                  <Link to={`/game/${game.gameId}`}>{game.gameId}</Link> —
                  Opponent: {opponent || "N/A"} — Start:{" "}
                  {new Date(game.startTime).toLocaleString()} — End:{" "}
                  {new Date(game.EndTime).toLocaleString()} —{" "}
                  {game.winner?.username === username ? "You won" : "You lost"}
                </>
              ) : type === "active" ? (
                <>
                  Opponent: {opponent || "?"} —{" "}
                  <Link to={`/game/${game.gameId}`}>Go to Game</Link>
                </>
              ) : type === "myOpen" ? (
                <>
                  Game ID:{" "}
                  <Link to={`/game/${game.gameId}`}>{game.gameId}</Link> —
                  Started at: {new Date(game.startTime).toLocaleString()}
                </>
              ) : (
                <>
                  {game.player1?.username || "Unknown"} –{" "}
                  <Link to={`/game/${game.gameId}`}>Join Game</Link>
                </>
              )}
            </li>
          );
        })}
      </>
    </section>
  );
};

export default GameSection;
