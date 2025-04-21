import Game from "../models/game.js";

const getGameById = async (req, res) => {
  try {
    const { gameId } = req.params;
    const numericId = parseInt(gameId);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Invalid gameId" });
    }

    const game = await Game.findOne({ gameId: numericId })
      .populate("player1", "username")
      .populate("player2", "username")
      .populate("winner", "username");

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error("❌ Error in getGameById:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve game", error: error.message });
  }
};

export default getGameById;
