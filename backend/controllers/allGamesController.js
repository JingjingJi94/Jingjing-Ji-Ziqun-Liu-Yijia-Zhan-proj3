import Game from "../models/game.js";
import { User } from "../models/user.js";

const getAllGamesByUser = async (req, res) => {
  try {
    const username = req.cookies.username;
    // When no user is logged in
    if (!username) {
      const activeGames = await Game.find({
        player2: { $ne: null },
        gameStatus: "Active",
      })
        .populate("player1", "username")
        .populate("player2", "username");

      const completedGames = await Game.find({
        gameStatus: "Completed",
      })
        .populate("winner", "username")
        .populate("player1", "username")
        .populate("player2", "username");

      return res.json({
        activeGames,
        completedGames,
      });
    }

    //when user is logged in
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userId = user._id;

    // 1. Open Games started by others, user can join
    const openGames = await Game.find({
      player1: { $ne: userId },
      player2: null,
      gameStatus: "Open",
    })
    .populate("player1", "username");

    // 2. My open games that were started by user' self, waiting for player 2 to join)
    const myOpenGames = await Game.find({
      player1: userId,
      player2: null,
      gameStatus: "Open",
    });

    // 3. My active games (joined by 2nd player, not completed)
    const myActiveGames = await Game.find({
      $or: [{ player1: userId }, { player2: userId }],
      player2: { $ne: null },
      gameStatus: "Active",
    })
    .populate("player1", "username")
    .populate("player2", "username");

    // 4. My completed games
    const myCompletedGames = await Game.find({
      $or: [{ player1: userId }, { player2: userId }],
      gameStatus: "Completed",
    })
    .populate("winner", "username")
    .populate("player1", "username")
    .populate("player2", "username");

    // 5. Other active or completed games (user not involved in)
    const otherGames = await Game.find({
      $nor: [{ player1: userId }, { player2: userId }],
      gameStatus: { $ne: "Open" },
    })
    .populate("winner", "username")
    .populate("player1", "username")
    .populate("player2", "username");

    res.json({
      username,
      openGames,
      myOpenGames,
      myActiveGames,
      myCompletedGames,
      otherGames,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching all games for user",
      error: err.message,
    });
  }
};

export default getAllGamesByUser;
