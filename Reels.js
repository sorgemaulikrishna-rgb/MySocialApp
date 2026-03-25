const express = require('express');
const router = express.Router(); // Router चालू किया
const mongoose = require('mongoose');

// --- REEL MODEL ---
const Reel = mongoose.model("Reel", {
  userId: String,
  videoUrl: String,
  caption: String,
  likes: [String],
  comments: [
    {
      _id: String,
      userId: String,
      text: String
    }
  ],
  shares: [String],
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. CREATE REEL (app की जगह router)
router.post("/reels/create", async (req, res) => {
  const { userId, videoUrl, caption } = req.body;
  const reel = new Reel({ userId, videoUrl, caption });
  await reel.save();
  res.json({ message: "Reel created", reel });
});

// 2. GET ALL REELS
router.get("/reels", async (req, res) => {
  const reels = await Reel.find().sort({ createdAt: -1 });
  res.json(reels);
});

// 3. LIKE/UNLIKE REEL
router.post("/reels/like/:reelId", async (req, res) => {
  const { userId } = req.body;
  const reel = await Reel.findById(req.params.reelId);
  if (!reel) return res.status(404).send("Reel not found");

  if (!reel.likes.includes(userId)) {
    reel.likes.push(userId);
  } else {
    reel.likes = reel.likes.filter(id => id !== userId);
  }

  await reel.save();
  res.json({ message: "Reel liked/unliked", totalLikes: reel.likes.length });
});

// 4. COMMENT ON REEL
router.post("/reels/comment/:reelId", async (req, res) => {
  const { userId, text } = req.body;
  const reel = await Reel.findById(req.params.reelId);

  const comment = { _id: new mongoose.Types.ObjectId().toString(), userId, text };
  reel.comments.push(comment);

  await reel.save();
  res.json({ message: "Comment added", comment });
});

// 5. GET REEL ANALYTICS
router.get("/reels/analytics/:reelId", async (req, res) => {
  const reel = await Reel.findById(req.params.reelId);
  res.json({
    likes: reel.likes.length,
    comments: reel.comments.length,
    shares: reel.shares.length
  });
});

// सबसे जरूरी लाइन!
module.exports = router; 
