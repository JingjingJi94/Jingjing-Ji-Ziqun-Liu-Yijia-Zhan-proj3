import Game from '../models/game.js';

const getAllGamesByUser = async (req, res) => {
  try {
    const username = req.cookies.user;
    if (!username){
        return res.status(401).json({ message: "Unauthorized" });
    }
    // 1. Open Games started by others, user can join
    const openGames = await Game.find({
      player1: { $ne: username },
      player2: null,
      gameStatus: 'Open',
    });

    // 2. My open games that were started by user' self, waiting for player 2 to join)
    const myOpenGames = await Game.find({
      player1: username,
      player2: null,
      gameStatus: 'Open',
    });

    // 3. My active games (joined by 2nd player, not completed)
    const myActiveGames = await Game.find({
      $or: [{ player1: username }, { player2: username }],
      player2: { $ne: null },
      gameStatus: 'Active',
    });

    // 4. My completed games
    const myCompletedGames = await Game.find({
      $or: [{ player1: username }, { player2: username }],
      gameStatus: 'Completed',
    });

    // 5. Other active or completed games (user not involved in)
    const otherGames = await Game.find({
        $nor: [{ player1: username }, { player2: username }],
        gameState: { $ne: 'open' } 
    });

    res.json({
      openGames,
      myOpenGames,
      myActiveGames,
      myCompletedGames,
      otherGames,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all games for user', error: err.message });
  }
};

export default getAllGamesByUser;

