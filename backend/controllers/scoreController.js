import { User } from "../models/user.js";

// Fetch users with scores sorted by wins, losses, and username
const getScores = async (req, res) => {
  const user = req.cookies.username;
  try {
    const users = await User.find()
      .sort({ numWins: -1, numLosses: 1, username: 1 })
      .select("username numWins numLosses"); // Only returning userName, numWins, and numLosses

    res.status(200).json({users, currentUser: user}); // Send the list of users as JSON
  } catch (error) {
    res.status(500).json({ message: "Error fetching high scores", error });
  }
};

export default getScores;
