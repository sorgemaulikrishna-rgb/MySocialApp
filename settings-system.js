const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- APP SETTINGS MODEL ---
const AppSetting = mongoose.model("AppSetting", {
  userId: String,
  notifications: {
    likes: { type: Boolean, default: true },
    comments: { type: Boolean, default: true },
    followers: { type: Boolean, default: true },
    live: { type: Boolean, default: true },
    dm: { type: Boolean, default: true }
  },
  privacy: {
    profileVisible: { type: Boolean, default: true },
    storyVisibleTo: { type: [String], default: [] }, 
    allowMentions: { type: Boolean, default: true }
  },
  theme: { type: String, default: "light" }, 
  language: { type: String, default: "en" },
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. CREATE OR UPDATE USER SETTINGS
router.post("/settings/update", async (req, res) => {
  const { userId, notifications, privacy, theme, language } = req.body;

  let settings = await AppSetting.findOne({ userId });
  if (!settings) {
    settings = new AppSetting({ userId, notifications, privacy, theme, language });
  } else {
    if (notifications) settings.notifications = notifications;
    if (privacy) settings.privacy = privacy;
    if (theme) settings.theme = theme;
    if (language) settings.language = language;
  }

  await settings.save();
  res.json({ message: "Settings updated", settings });
});

// 2. GET USER SETTINGS
router.get("/settings/:userId", async (req, res) => {
  const settings = await AppSetting.findOne({ userId: req.params.userId });
  if (!settings) return res.status(404).send("Settings not found");
  res.json({ settings });
});

// 3. CHANGE THEME (Short route)
router.post("/settings/theme", async (req, res) => {
  const { userId, theme } = req.body; 
  const settings = await AppSetting.findOne({ userId });
  if (!settings) return res.status(404).send("Settings not found");

  settings.theme = theme;
  await settings.save();
  res.json({ message: "Theme updated", settings });
});

module.exports = router;
