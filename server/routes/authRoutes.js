import express from "express";
import passport from "passport";
import {
  register,
  login,
  getMe,
  checkUsername,
  googleCallback,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/check-username/:username", checkUsername);
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

// 🟢 Initiate Google Auth (Explicitly passing scope)
router.get("/google", (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })(req, res, next);
});

// Google Callback Endpoint
router.get("/google/callback", googleCallback);

export default router;