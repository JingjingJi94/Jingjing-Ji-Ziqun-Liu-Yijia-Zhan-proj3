import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewGame = () => {
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        "/api/games/create",
        {},
        {
          withCredentials: true,
        }
      );
      navigate(`/game/${res.data.gameId}`);
    } catch (err) {
      console.error("Failed to create game:", err);
      alert("Error creating game.");
    }
  };

  return (
    <div>
      <h2>Create New Game</h2>
      <button onClick={handleCreate}>Create Game</button>
    </div>
  );
};

export default NewGame;
