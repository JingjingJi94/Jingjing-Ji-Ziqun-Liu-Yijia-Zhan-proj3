import generateRandomBoard from "../utils/generateRandomBoard.js";
import { User } from "../models/user.js";
import Counter from "../models/autoIncrement.js"; // Assuming you have a Counter model for gameId
import Game from "../models/game.js";

const getNextGameId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "gameId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
};

const createNewGame = async (req, res) => {
  try {
    const username = req.cookies.username;
    if (!username) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No username cookie" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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

    res.status(201).json({ gameId: newGame.gameId });
  } catch (error) {
    console.error("❌ Error creating new game:", error);
    res
      .status(500)
      .json({ message: "Failed to create game", error: error.message });
  }
};

export default createNewGame;
