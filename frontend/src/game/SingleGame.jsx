import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Board from "../components/Board";

const SingleGame = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        // First, check login status
        const loginStatus = await axios.get("/api/auth/status", {
          withCredentials: true,
        });

        if (!loginStatus.data.loggedIn) {
          setUsername(null);
          return;
        }

        const currentUsername = loginStatus.data.username;
        setUsername(currentUsername);

        // Then, fetch game
        const gameRes = await axios.get(`/api/game/${gameId}`, {
          withCredentials: true,
        });
        const gameData = gameRes.data;
        setGame(gameData);

        const p1Username = gameData.player1?.username;
        const p2Username = gameData.player2?.username;

        if (p1Username === currentUsername) {
          setCurrentPlayer("player1");
        } else if (p2Username === currentUsername) {
          setCurrentPlayer("player2");
        } else {
          setCurrentPlayer(null);
        }
      } catch (err) {
        console.error(err);
        setError("Game not found.");
      }
    };

    fetchGame();
  }, [gameId]); // ✅ Only depend on gameId to avoid infinite loop

  const handleAttack = async (row, col) => {
    if (!username || game?.winner) return;
    try {
      const gameRes = await axios.post(
        `/api/games/${gameId}/attack`,
        { row, col },
        { withCredentials: true }
      );
      setGame(gameRes.data);
    } catch (err) {
      console.error("Attack failed:", err);
    }
  };

  if (!username) return <p>Log in required to play.</p>;
  if (error) return <p>{error}</p>;
  if (!game || game === null || game === undefined) return <p>Game not loaded.</p>;
  console.log(game);
  const yourBoard =
    currentPlayer === "player1" ? game.player1Board : game.player2Board;
  let yourBoardAll = Array(10).fill().map(() => Array(10).fill("box"));
  const yourShips = yourBoard?.ships || [];
  console.log("Your ships:", yourShips);  // Debugging log to check ship positions

  // const yourShips = yourBoard ? yourBoard.ships : [];

  // Iterate over the ship positions and update yourBoardAll
  yourShips.forEach(ship => {
    ship.positions.forEach(position => {
      const { row, col } = position;
      // console.log(position);
      // Mark the position as "ship" on the board
      yourBoardAll[row][col] = "ship";
    });
  });

  const opponentBoard =
    currentPlayer === "player1" ? game.player2Board : game.player1Board;
  let opponentBoardAll = Array(10).fill().map(() => Array(10).fill("box"));
  if (!opponentBoard && opponentBoard !== null && opponentBoard !== undefined) {
    const opponentShips = opponentBoard.ships;

    // Iterate over the ship positions and update opponentBoardAll
    opponentShips.forEach(ship => {
      ship.positions.forEach(position => {
        const { row, col } = position;
        // console.log(position);
        // Mark the position as "ship" on the board
        opponentBoardAll[row][col] = "ship";
      });
    });
  }
  

  return (
    <div className="game-container">
      <h1>Battleship Game</h1>

      {game.winner && (
        <h2 className="game-over">Game Over! {game.winner} Won!!</h2>
      )}

      <div className="boards">
        <div>
          <h2>Your Board</h2>
          <Board
            board={yourBoardAll}
            onCellClick={() => {}}
            hideShips={false}
            gameOver={!!game.winner}
          />
        </div>
        <div>
          <h2>Opponent Board</h2>
          <Board
            board={opponentBoardAll}
            onCellClick={handleAttack}
            hideShips={true}
            gameOver={!!game.winner}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleGame;
