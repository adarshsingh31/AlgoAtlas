import express from "express";
import {
  signup,
  login,
  googleAuth,
  getMe,
  setPassword,
  changePassword,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// ─── Public Routes (no auth required) ────────────────────────────────────────

// POST /api/auth/signup — register a new user
router.post("/signup", signup);

// POST /api/auth/login — login with email + password
router.post("/login", login);

// POST /api/auth/google — verify Google ID token and return an AlgoAtlas JWT
router.post("/google", googleAuth);

// ─── Protected Routes (JWT required) ─────────────────────────────────────────

// GET /api/auth/me — return current user profile (used to restore session on page load)
router.get("/me", protect, getMe);

// POST /api/auth/set-password — allows Google-only users to add a local password
router.post("/set-password", protect, setPassword);

// PUT /api/auth/change-password — change existing password
router.put("/change-password", protect, changePassword);

export default router;
