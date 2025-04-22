import { User, createUser } from "../models/user.js";

// /register route
const registerUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  if (
    !validateCredentials(req, res, username, password) ||
    password !== confirmPassword
  )
    return;

  try {
    // Check if username is taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Create new user
    const newUser = await createUser(username, password);

    // ====================================
    // deleted `await newUser.save();`
    // log in user after registration and assign seesion id
    // req.session.userId = newUser._id;
    // res.cookie("user", username);
    res.cookie("username", username, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    // ====================================
    res
      .status(201)
      .json({ message: "User registered and logged in successfully" });
  } catch (error) {
    console.error("❌ Register Error:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// / User login route
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!validateCredentials(req, res, username, password)) return;

  try {
    // Find user by username
    const user = await User.findOne({ username });

    // no existing user
    if (!user) {
      return res.status(400).json({ message: "Invalid username" });
    }

    // Valid username: compare password with hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Valid username and password: create session for logged-in user
    // ====================================
    // req.session.userId = user._id;
    // res.cookie("user", username);
    res.cookie("username", username, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });
    // ====================================
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Status:", err.response?.status);
    console.log("Message:", err.response?.data?.message);

    res.status(500).json({ message: "Error logging in", error });
  }
};

// logout route: User logout
const logoutUser = async (req, res) => {
  // Destroy session

  // =====================================
  // req.session.destroy((err) => {
  //   if (err) {
  //     return res.status(500).json({ message: "Error logging out", error: err });
  //   }
  res.clearCookie("username", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });
  // =====================================
  res.status(200).json({ message: "Logged out successfully" });
};

function validateCredentials(req, res, username, password) {
  if (!username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return false;
  }
  return true;
}

const getLoginStatus = (req, res) => {
  const username = req.cookies.username;
  if (username) {
    return res.json({ loggedIn: true, username }); // If user is logged in, send this
  } else {
    return res.json({ loggedIn: false }); // If user is not logged in, send this
  }
};

export { registerUser, loginUser, logoutUser, getLoginStatus };
