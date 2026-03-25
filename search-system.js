const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- ROUTES ---

// 1. COMBINED SEARCH (All in One)
router.get("/search/all", async (req, res) => {
  const query = req.query.q || "";
  
  try {
    // parallel execution ताकि परफॉरमेंस बनी रहे
    const [users, posts, reels] = await Promise.all([
      mongoose.model("User").find({ 
        $or: [
          { username: { $regex: query, $options: "i" } },
          { displayName: { $regex: query, $options: "i" } }
        ] 
      }).limit(10).select("username displayName profilePicture"),
      
      mongoose.model("Post").find({ 
        caption: { $regex: query, $options: "i" } 
      }).limit(10).populate("userId", "username profilePicture"),
      
      mongoose.model("Reel").find({ 
        caption: { $regex: query, $options: "i" } 
      }).limit(10).populate("userId", "username profilePicture")
    ]);

    res.json({ users, posts, reels });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. SPECIFIC USER SEARCH
router.get("/search/users", async (req, res) => {
  const query = req.query.q || "";
  const users = await mongoose.model("User").find({ 
    username: { $regex: query, $options: "i" } 
  }).limit(20).select("username displayName profilePicture");
  
  res.json({ total: users.length, users });
});

module.exports = router;
