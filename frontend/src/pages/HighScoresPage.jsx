import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/common.css";
import "../css/scores.css";

const HighScores = () => {
  const [scores, setScores] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("/api/high-scores"); 
        // console.log("High scores response:", response.data);
        const { users, currentUser } = response.data;
        setCurrentUser(currentUser); 
        const sortedScores = users
          .sort((a, b) => {
            // Sort by wins, then losses, and lastly by username alphabetically
            if (a.numWins !== b.numWins) {
              return b.numWins - a.numWins;
            } else if (a.numLosses !== b.numLosses) {
              return a.numLosses - b.numLosses;
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
                  fontWeight: player.username === currentUser ? "bold" : "normal",
                }}
              >
                {player.username}
              </td>
              <td>{player.numWins}</td>
              <td>{player.numLosses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HighScores;
