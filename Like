const express = require('express');
const router = express.Router(); // यह सही है
const mongoose = require('mongoose');

// --- LIKE / UNLIKE (TOGGLE) ---
// ध्यान दें: यहाँ 'app' की जगह 'router' इस्तेमाल करें
router.post("/like/:postId", async (req, res) => {
  const { userId } = req.body;
  const post = await Post.findById(req.params.postId);

  if (!post) return res.status(404).send("Post not found");

  let liked = false;
  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter(id => id !== userId);
    liked = false;
  } else {
    post.likes.push(userId);
    liked = true;
  }

  await post.save();
  res.json({
    message: liked ? "Liked" : "Unliked",
    totalLikes: post.likes.length,
    liked: liked
  });
});

// --- GET TOTAL LIKES ---
router.get("/likes/count/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  res.json({ totalLikes: post.likes.length });
});

// --- CLEAR ALL LIKES (ADMIN) ---
router.post("/likes/clear/:postId", async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.likes = [];
  await post.save();
  res.json({ message: "All Likes Cleared", totalLikes: 0 });
});

// फाइल के एकदम आखिर में (जैसा आपने फोटो 1000025145.jpg में दिखाया है)
module.exports = router; 
