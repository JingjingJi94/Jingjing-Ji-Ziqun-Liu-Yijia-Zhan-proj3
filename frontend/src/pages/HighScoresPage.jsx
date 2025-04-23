import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/common.css";
import "../css/scores.css";

const HighScores = () => {
  const [scores, setScores] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("/api/high-scores"); 
        const sortedScores = response.data
          .sort((a, b) => {
            // Sort by wins, then losses, and lastly by username alphabetically
            if (a.wins !== b.wins) {
              return b.wins - a.wins;
            } else if (a.losses !== b.losses) {
              return a.losses - b.losses;
            } else {
              return a.username.localeCompare(b.username);
            }
          });
        setScores(sortedScores);
      } catch (err) {
        console.error("Failed to fetch high scores:", err);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="scores-content">
      <div className="score-page">
        <h1>&gt;&gt;&gt;High Scores&lt;&lt;&lt;</h1>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={player.username}>  
              <td>{index + 1}</td>
              <td
                style={{
                  fontWeight: player.username === username ? "bold" : "normal",
                }}
              >
                {player.username}
              </td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScores;
