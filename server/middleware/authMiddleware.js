import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to protect routes that require authentication
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Extract token from Authorization header or cookies
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]?.trim();
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  // 2. Safeguard: Check if JWT_SECRET environment variable is loaded
  if (!process.env.JWT_SECRET) {
    console.error("CRITICAL ERROR: JWT_SECRET is not defined in environment variables.");
    return res.status(500).json({ message: "Internal server authentication configuration error" });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Fetch user details
    req.user = await User.findById(decoded.id).select("name username email role");

    if (!req.user) {
      return res.status(401).json({ message: "User account no longer exists" });
    }

    next();
  } catch (err) {
    // Handle Token Expiration
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Session expired, please sign in again",
        code: "TOKEN_EXPIRED" 
      });
    }

    // Handle Malformed Token or Signature Error
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

/**
 * Middleware to restrict route access to Admin role only
 */
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin privileges required." });
  }
};