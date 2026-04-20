import express from "express";
import { reviewCode } from "../services/groqService.js";

const router = express.Router();

/**
 * POST /api/review/
 * Submits code for AI-powered review.
 */
router.post("/", async (req, res) => {
  try {
    const { code, language } = req.body;

    // ─── Validation ────────────────────────────────────────────────────────
    // Code must exist and be at least 10 characters long
    if (!code || typeof code !== "string" || code.trim().length < 10) {
      return res.status(400).json({
        error: "Code must be provided and must be at least 10 characters long.",
      });
    }

    // Language is required for context
    if (!language || typeof language !== "string") {
      return res.status(400).json({
        error: "Programming language must be specified.",
      });
    }

    // ─── Call AI Service ───────────────────────────────────────────────────
    const review = await reviewCode(code, language);

    // ─── Return Response ───────────────────────────────────────────────────
    return res.status(200).json(review);
  } catch (error) {
    console.error("[Route Error] /api/review:", error.message);
    
    // Return 500 for server/AI service failures
    return res.status(500).json({
      error: error.message || "Internal Server Error during code review.",
    });
  }
});

export default router;
