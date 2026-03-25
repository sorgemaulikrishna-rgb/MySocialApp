const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- ROUTES ---

// 1. GET TRENDING POSTS (app की जगह router)
router.get("/explore/posts", async (req, res) => {
  const posts = await mongoose.model("Post").find()
    .sort({ "likes.length": -1, "comments.length": -1, createdAt: -1 })
    .limit(50)
    .lean();

  res.json({ total: posts.length, posts });
});

// 2. GET TRENDING REELS
router.get("/explore/reels", async (req, res) => {
  const reels = await mongoose.model("Reel").find()
    .sort({ "likes.length": -1, "comments.length": -1, createdAt: -1 })
    .limit(50)
    .lean();

  res.json({ total: reels.length, reels });
});

// 3. GET USER SUGGESTIONS (Who to follow)
router.get("/explore/users", async (req, res) => {
  const users = await mongoose.model("User").find()
    .sort({ followers: -1 })
    .limit(20)
    .lean();

  res.json({ total: users.length, users });
});

// 4. SEARCH (Posts और Users दोनों के लिए)
router.get("/explore/search", async (req, res) => {
  const q = req.query.q || "";
  const posts = await mongoose.model("Post").find({ caption: { $regex: q, $options: "i" } }).limit(20);
  const users = await mongoose.model("User").find({ username: { $regex: q, $options: "i" } }).limit(20);

  res.json({ posts, users });
});

module.exports = router;
