const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- ROUTES ---

// 1. GET SUGGESTED USERS (app की जगह router)
router.get("/suggestions/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // वर्तमान यूजर की फॉलोइंग लिस्ट निकालें
    const user = await mongoose.model("User").findById(userId).lean();
    if (!user) return res.status(404).send("User not found");
    
    const following = user.following || [];

    // उन यूजर्स को ढूंढें जिन्हें अभी फॉलो नहीं किया गया है
    const suggestions = await mongoose.model("User").find({
      _id: { $ne: userId, $nin: following }
    })
    .limit(20)
    .select("username displayName profilePicture followers")
    .sort({ "followers.length": -1 }); // सबसे ज्यादा फॉलोअर्स वालों को पहले दिखाएं

    res.json({ total: suggestions.length, suggestions });
  } catch (err) {
    res.status(500).json({ message: "Error fetching suggestions", error: err.message });
  }
});

module.exports = router;
