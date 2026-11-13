import express from "express";
import {
  updateUserProfile,
  getUserProfile,
} from "../controllers/userProfileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @route   GET /api/profile/:username
 * @desc    Get user profile card by username
 * @access  Public
 */
router.get("/:username", getUserProfile);

/**
 * @route   PUT /api/profile/:username
 * @desc    Create or update user profile card
 * @access  Private (Requires valid JWT token)
 */
router.put("/:username", protect, updateUserProfile);

export default router;