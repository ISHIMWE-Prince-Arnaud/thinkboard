import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json("All fields are required");
    }

    if (password.length < 6) {
      return res.status(400).json("Password must be at least 6 characters");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json("User already exists");
    }

    const newUser = await User.create({ username, email, password });

    if (newUser) {
      await generateToken(res, newUser._id);
      return res.status(201).json("User created successfully");
    } else {
      return res.status(400).json("Failed to create user");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { password, email } = req.body;

    if (!password || !email) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      await generateToken(res, user._id);
      return res.json({
        message: "User logged in successfully",
        user: { _id: user._id, username: user.username, email: user.email, avatar: user.avatar },
      });
    } else {
      return res.status(400).json("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function logout(req, res) {
  try {
    res.cookie('jwt', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 0,
    });
    res.json("User logged out successfully");
  } catch (error) {
    res.status(500).json("Internal server error");
    console.log(error);
  }
}

export async function profile(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json("Internal server error");
    console.log(error);
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json("User not found");
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json("Internal server error");
    console.log(error);
  }
}