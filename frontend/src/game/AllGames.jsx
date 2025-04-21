// Future real API call example:
// axios.get("http://localhost:3001/api/games").then(res => setGames(res.data));

import React, { useEffect, useState } from "react";
import axios from "axios";
import GameSection from "./GameSection";

const AllGames = () => {
  const [allGameData, setAllGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("/api/games", { withCredentials: true })
      .then((res) => {
        console.log("🎯 Loaded game data:", res.data); // Add this!
        console.log("🧠 username:", username);
        setAllGameData(res.data);
      })
      .catch((err) => console.error("Failed to load games", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading game data...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Games</h2>
      <>
        <GameSection
          title="Active Games"
          games={allGameData.myActiveGames}
          type="active"
          username={username}
        />
        <GameSection
          title="Completed Games"
          games={allGameData.myCompletedGames}
          type="completed"
          username={username}
        />
      </>
      <>
        <GameSection
          title="Open Games"
          games={allGameData.openGames}
          type="open"
        />
        <GameSection
          title="My Open Games"
          games={allGameData.myOpenGames}
          type="myOpen"
        />
        <GameSection
          title="My Active Games"
          games={allGameData.myActiveGames}
          type="active"
          username={username}
        />
        <GameSection
          title="My Completed Games"
          games={allGameData.myCompletedGames}
          type="completed"
          username={username}
        />
        <GameSection
          title="Other Games"
          games={allGameData.otherGames}
          type="other"
        />
      </>
    </div>
  );
};

export default AllGames;
