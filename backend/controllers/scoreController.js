import { User } from "../models/user.js";

// Fetch users with scores sorted by wins, losses, and username
const getScores = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ numWins: -1, numLosses: 1, userName: 1 })
      .select("userName numWins numLosses"); // Only returning userName, numWins, and numLosses

    res.status(200).json(users); // Send the list of users as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching high scores", error });
  }
};

export default getScores;
