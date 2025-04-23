import generateRandomBoard from "../utils/generateRandomBoard.js";
import { User } from "../models/user.js";
import Counter from "../models/autoIncrement.js"; 
import Game from "../models/game.js";

const getNextGameId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "gameId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  console.log("Next Game ID: ", counter.value);
  return counter.value;
};

const createNewGame = async (req, res) => {
  try {
    const { username } = req.cookies;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const nextId = await getNextGameId();

    const newGame = new Game({
      gameId: nextId,
      player1: user._id,
      player1Board: generateRandomBoard(),
      gameStatus: "Open",
      startTime: new Date(),
    });

    await newGame.save();
    return res.status(200).json({ gameId: newGame.gameId });
  } catch (err) {
    console.error("Error creating new game:", err);
    return res.status(500).json({ error: "Error creating new game" });
  }
};

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;
    const username = req.cookies.username;
    if (!username) {
      return res.status(401).json({ message: "Unauthorized: No username cookie" });
    }
    
    let game = await Game.findOne({ gameId }).populate("player1 player2 winner");

    if (!game) {
      // game = await createNewGame(username); //create game if gameId is new
      return res.status(404).json({message: "Game Not Exist"});
    }

    const player1_board = game.player1Board;
    const player2_board = game.player2Board;

    res.status(200).json({ 
      gameId: game.gameId,
      currentTurn: game.currentTurn,
      gameStatus: game.gameStatus,
      player1: game.player1,
      player2: game.player2,
      player1Board: player1_board,
      player2Board: player2_board
     });
  } catch (error) {
    console.error("❌ Error retriving game:", error);
    res.status(500).json({ message: "Failed to retrive game", error: error.message });
  }
};

const attack = async (req, res) => {
  const userId = req.cookies.userId;
  const { gameId } = req.params;
  const { row, col } = req.body;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ error: "Game not found." });
    }

    const activePlayer =
      game.player1.id === userId ? "player1" :
      game.player2.id === userId ? "player2" : null;

    if (!activePlayer) {
      return res.status(403).json({ error: "You are not a player in this game." });
    }

    if (game.winner) {
      return res.status(400).json({ error: "Game is already over." });
    }

    if (game.turn !== activePlayer) {
      return res.status(403).json({ error: "Not your turn." });
    }

    const attackerRole = activePlayer;
    const defenderRole = attackerRole === "player1" ? "player2" : "player1";
    const defenderBoard = defenderRole === "player1" ? game.player1Board : game.player2Board;

    const alreadyHit = defenderBoard.hits.some(pos => pos.row === row && pos.col === col);
    const alreadyMiss = defenderBoard.misses.some(pos => pos.row === row && pos.col === col);
    if (alreadyHit || alreadyMiss) {
      return res.status(400).json({ error: "This position has already been attacked." });
    }

    let isHit = false;
    for (let ship of defenderBoard.ships) {
      const hitIndex = ship.positions.findIndex(
        pos => pos.row === row && pos.col === col
      );

      if (hitIndex !== -1) {
        isHit = true;
        defenderBoard.hits.push({ row, col });
        ship.positions.splice(hitIndex, 1);
        if (ship.positions.length === 0) {
          ship.isSunk = true;
        }
        break;
      }
    }

    if (!isHit) {
      defenderBoard.misses.push({ row, col });
    }

    const allSunk = defenderBoard.ships.every(ship => ship.isSunk);
    if (allSunk) {
      game.winner = attackerRole;
    } else {
      game.turn = defenderRole;
    }

    await game.save();
    return res.json(game);
  } catch (err) {
    console.error("Attack error:", err);
    return res.status(500).json({ error: "Server error during attack." });
  }
};


export { createNewGame, getGameById, attack };
