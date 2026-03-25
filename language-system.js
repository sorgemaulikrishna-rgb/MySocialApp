const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- LANGUAGE SETTING MODEL ---
const LanguageSetting = mongoose.model("LanguageSetting", {
  userId: String,
  language: { type: String, default: "en" }, 
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. SET OR UPDATE LANGUAGE
router.post("/language/update", async (req, res) => {
  const { userId, language } = req.body;

  let setting = await LanguageSetting.findOne({ userId });
  if (!setting) {
    setting = new LanguageSetting({ userId, language });
  } else {
    setting.language = language;
  }

  await setting.save();
  res.json({ message: "Language updated successfully", setting });
});

// 2. GET USER LANGUAGE
router.get("/language/:userId", async (req, res) => {
  const setting = await LanguageSetting.findOne({ userId: req.params.userId });
  if (!setting) return res.status(404).send("Language setting not found");

  res.json({ language: setting.language });
});

// 3. GET SUPPORTED LANGUAGES
router.get("/language/supported", (req, res) => {
  const supported = ["en", "hi", "es", "fr", "de", "zh", "ar", "pt", "ru"];
  res.json({ total: supported.length, supported });
});

module.exports = router;

