import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const GameSection = ({ title, games, type, username }) => {
  const navigate = useNavigate();
  if (!games || games.length === 0) return null;

  return (
    <section style={{ marginBottom: "20px" }}>
      <h3>{title}</h3>
      <>
        {games.map((game) => {
          let opponent = "Unknown";
          if (game.player1?.username === username && game.player2?.username) {
            opponent = game.player2.username;
          } else if (game.player2?.username === username && game.player1?.username) {
            opponent = game.player1.username;
          }

          return (
            <li
              key={game.gameId || game._id}
              style={{ listStyleType: "none", paddingLeft: 0 }}
            >
              {type === "nologinActive" && (
                <>
                  Game ID: {game.gameId} 
                  <br />
                  Players: {game.player1?.username || "?"} VS.{" "}
                  {game.player2?.username || "?"}
                  <br />
                  <br />
                </>
              )}
              {type === "nologinCompleted" && (
                <>
                  Game ID: {game.gameId}
                  <br />
                  Players: {game.player1?.username || "?"} VS.{" "}
                  {game.player2?.username || "?"}
                  <br />
                  Start: {new Date(game.startTime).toLocaleString()} 
                  <br />
                  End: {new Date(game.endTime).toLocaleString()}
                  <br />
                  {game.winner?.username ? (
                    <>
                      Winner: {game.winner.username}
                    </>
                  ) : (
                    "No winner"
                  )}
                  <br />
                  <br />
                </>
              )}
              {type === "other" ? (
                <>
                  Game ID: {game.gameId} -- 
                  <Link to={`/game/${game.gameId}`}>Go to Game</Link>
                  <br />
                  — Status: {game.gameStatus || "N/A"}
                  <br />
                  Players: {game.player1?.username || "?"} VS.{" "}
                  {game.player2?.username || "?"}
                  <br />
                  — Winner: {game.winner?.username || "N/A"}
                  <br />
                  Start: {new Date(game.startTime).toLocaleString()}
                  <br />
                  {game.gameStatus === "Completed" && (
                    <>
                      — End: {new Date(game.endTime).toLocaleString()} 
                      <br />
                    </>
                  )}
                  <br />
                </>
              ) : type === "completed" ? (
                <>
                  Game ID:{" "}
                  <Link to={`/game/${game.gameId}`}>{game.gameId}</Link> —
                  Opponent: {opponent || "N/A"} 
                  — Start:{" "}
                  {new Date(game.startTime).toLocaleString()} 
                  — End:{" "}
                  {new Date(game.endTime).toLocaleString()} —{" "}
                  {game.winner?.username === username ? "You won" : "You lost"}
                </>
              ) : type === "active" ? (
                <>
                  Game ID: {game.gameId} — 
                  Opponent: {opponent || "?"} —{" "}
                  <Link to={`/game/${game.gameId}`}>Go to Game</Link>
                </>
              ) 
              : type === "myOpen" ? (
                <>
                  Game ID: {game.gameId} — 
                  Started at: {new Date(game.startTime).toLocaleString()} — 
                  <Link to={`/game/${game.gameId}`}>Go to Game</Link>
                </>
              ) : username && type === "join" ? (
                <>
                  Game ID: {game.gameId} –{" "}
                  <Link to={`/game/${game.gameId}`}>Join Game</Link>
                </>
              ) : type === "open" ? (
                <>
                  Game ID: {game.gameId} <br />
                  Players: {game.player1.username} —{" "}
                  {game.player2 ? (
                    `Opponent: ${game.player2.username}`
                  ) : (
                    "Waiting for opponent"
                  )}
                  {!game.player2 && (
                    <button
                      onClick={() => navigate(`/game/${game.gameId}`)} 
                      style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Join Game
                    </button>
                  )}
                </>
              ) : null}
            </li>
          );
        })}
      </>
    </section>
  );
};

export default GameSection;
