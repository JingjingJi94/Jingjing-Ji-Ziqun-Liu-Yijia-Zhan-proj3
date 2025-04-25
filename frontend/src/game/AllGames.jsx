import React, { useEffect, useState } from "react";
import axios from "axios";
import GameSection from "./GameSection";

const AllGames = () => {
  const [allGameData, setAllGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .get("/api/games", { withCredentials: true })
      .then((res) => {
        console.log("🎯 Loaded game data:", res.data); 
        console.log("🧠 username:", username);
        if (res.data.username) {
          setUsername(res.data.username);
        }
        setAllGameData(res.data);
      })
      .catch((err) => console.error("Failed to load games", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>Loading game data...</div>;
  }

  const showGameSections = () => {
    if (username) {
      return (
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
            username={username}
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
            username={username}
          />
        </>
      );
    } else {
      // when no user is logged in, show active and completed games
      return (
        <>
          <GameSection
            title="Active Games"
            games={allGameData.activeGames}
            type="nologinActive"
          />
          <GameSection
            title="Completed Games"
            games={allGameData.completedGames} 
            type="nologinCompleted"
          />
        </>
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Games</h2>
      {showGameSections()}
    </div>
  );
};

export default AllGames;