const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- ANALYTICS MODEL ---
const Analytics = mongoose.model("Analytics", {
  postId: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  shares: { type: Number, default: 0 },
  saves: { type: Number, default: 0 }
});

// --- ROUTES ---

// 1. TRACK VIEW
router.post("/analytics/view/:postId", async (req, res) => {
  const data = await Analytics.findOne({ postId: req.params.postId });
  if (data) {
    data.views += 1;
    await data.save();
    res.json({ views: data.views });
  } else {
    res.status(404).send("Analytics not found");
  }
});

// 2. TRACK LIKE (इसी तरह Like, Comment, Share, Save के लिए भी काम करेगा)
router.post("/analytics/like/:postId", async (req, res) => {
  const data = await Analytics.findOne({ postId: req.params.postId });
  if (data) {
    data.likes += 1;
    await data.save();
    res.json({ likes: data.likes });
  } else {
    res.status(404).send("Analytics not found");
  }
});

// 3. GET POST ANALYTICS
router.get("/analytics/:postId", async (req, res) => {
  const data = await Analytics.findOne({ postId: req.params.postId });
  res.json(data);
});

// 4. TRENDING POSTS (BY LIKES + VIEWS)
router.get("/analytics/trending", async (req, res) => {
  const all = await Analytics.find();
  const sorted = all.sort((a, b) => {
    const scoreA = (a.likes || 0) + (a.views || 0);
    const scoreB = (b.likes || 0) + (b.views || 0);
    return scoreB - scoreA;
  });
  res.json(sorted.slice(0, 10));
});

// सबसे जरूरी लाइन!
module.exports = router;
