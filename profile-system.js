const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- PROFILE MODEL ---
const ProfileCustomization = mongoose.model("ProfileCustomization", {
  userId: String,
  displayName: String,
  bio: String,
  profilePicture: String,
  website: String,
  theme: { type: String, default: "light" }, 
  accentColor: { type: String, default: "#000000" },
  privateAccount: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. UPDATE PROFILE (Create if not exists)
router.post("/profile/update", async (req, res) => {
  const { userId, displayName, bio, profilePicture, website, theme, accentColor, privateAccount } = req.body;

  try {
    let profile = await ProfileCustomization.findOne({ userId });
    
    if (!profile) {
      profile = new ProfileCustomization(req.body);
    } else {
      // सिर्फ वही चीजें अपडेट करें जो बॉडी में भेजी गई हैं
      Object.assign(profile, req.body);
    }

    await profile.save();
    res.json({ message: "Profile updated successfully ✅", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET USER PROFILE
router.get("/profile/:userId", async (req, res) => {
  const profile = await ProfileCustomization.findOne({ userId: req.params.userId });
  if (!profile) return res.status(404).json({ message: "Profile not found" });
  res.json({ profile });
});

// 3. TOGGLE PRIVATE ACCOUNT (Quick Access)
router.post("/profile/togglePrivate", async (req, res) => {
  const { userId, privateAccount } = req.body;
  const profile = await ProfileCustomization.findOneAndUpdate(
    { userId }, 
    { privateAccount }, 
    { new: true }
  );
  if (!profile) return res.status(404).send("Profile not found");
  res.json({ message: "Privacy updated", profile });
});

module.exports = router;
