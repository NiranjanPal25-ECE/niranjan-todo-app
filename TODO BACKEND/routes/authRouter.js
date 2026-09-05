const express = require("express");

const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const authRouter = express.Router();

authRouter.get(
  "/google",
  authController.googleLogin
);

authRouter.get(
  "/google/callback",
  authController.googleCallback
);

authRouter.get(
  "/me",
  authMiddleware,
  authController.getCurrentUser
);

module.exports = authRouter;