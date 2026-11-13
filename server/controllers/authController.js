import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Utility: Generate JWT Token
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * @desc    Check username availability
 * @route   GET /api/auth/check-username/:username
 * @access  Public
 */
export const checkUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const cleanUsername = username.toLowerCase().trim();

    const RESERVED_USERNAMES = [
      "admin", "api", "dashboard", "support", 
      "login", "signup", "signin", "settings", "profile"
    ];

    if (RESERVED_USERNAMES.includes(cleanUsername)) {
      return res.status(200).json({ available: false, reason: "reserved" });
    }

    const existingUser = await User.findOne({ username: cleanUsername });

    return res.status(200).json({
      available: !existingUser,
      username: cleanUsername,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error checking username", error: error.message });
  }
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const cleanUsername = username.toLowerCase().trim();
    const cleanEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({
      $or: [{ email: cleanEmail }, { username: cleanUsername }],
    });

    if (userExists) {
      if (userExists.email === cleanEmail) {
        return res.status(400).json({ message: "Email is already registered" });
      }
      return res.status(400).json({ message: "Username is already taken" });
    }

    const user = await User.create({
      name: name || cleanUsername,
      username: cleanUsername,
      email: cleanEmail,
      password,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during registration", error: error.message });
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter both email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      message: "Signed in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error during login", error: error.message });
  }
};

/**
 * @desc    Get currently logged-in user profile
 * @route   GET /api/auth/me
 * @access  Private (Requires protect middleware)
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "Server error fetching user details", error: error.message });
  }
};

/**
 * @desc    Google Auth Callback Redirect Handler
 * @route   GET /api/auth/google/callback
 * @access  Public
 */
export const googleCallback = (req, res, next) => {
  const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err) {
      console.error("❌ Google Auth Strategy Error:", err);
      return res.redirect(`${clientUrl}/signin?error=google_failed`);
    }

    if (!user) {
      console.error("❌ Passport Authentication Failure Info:", info);
      return res.redirect(`${clientUrl}/signin?error=google_user_not_found`);
    }

    try {
      // Issue JWT token for Google authenticated user
      const token = generateToken(user._id);

      // Redirect to frontend AuthCallback component with token
      return res.redirect(`${clientUrl}/auth/callback?token=${token}`);
    } catch (error) {
      console.error("❌ Token generation error during Google Auth:", error.message);
      return res.redirect(`${clientUrl}/signin?error=google_auth_failed`);
    }
  })(req, res, next);
};