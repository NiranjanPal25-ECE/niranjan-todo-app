const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

exports.googleLogin = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",

    scope: [
      "openid",
      "profile",
      "email",
    ],

    prompt: "select_account",
  });

  res.redirect(url);
};

exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send("Google authorization code missing");
    }

    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    if (!data.email || !data.id) {
      return res.status(400).send("Google account information unavailable");
    }

    let user = await User.findOne({
      googleId: data.id,
    });

    if (!user) {
      user = await User.findOne({
        email: data.email,
      });
    }

    if (!user) {
      user = await User.create({
        googleId: data.id,
        name: data.name || "Google User",
        email: data.email,
        profilePicture: data.picture || "",
      });
    } else {
      user.googleId = data.id;
      user.name = data.name || user.name;
      user.profilePicture = data.picture || user.profilePicture;

      await user.save();
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const frontendUrl =
      process.env.FRONTEND_URL || "http://localhost:5173";

    res.redirect(
      `${frontendUrl}/?token=${encodeURIComponent(token)}`
    );
  } catch (error) {
    console.error("Google login error:", error);

    res.status(500).send("Google login failed");
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-__v"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Unable to get user",
    });
  }
};