const express = require("express");
const router = express.Router();
const Post = require("../models/Post"); // models फोल्डर से Post फाइल बुला रहे हैं

// 1. नई पोस्ट बनाना
router.post("/create", async (req, res) => {
  try {
    const { userId, image, caption } = req.body;
    const newPost = new Post({ userId, image, caption });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. सारी पोस्ट देखना (Feed)
router.get("/all", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", "username profilePicture");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. पोस्ट लाइक/अनलाइक करना
router.post("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { userId } = req.body;
    
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked! ❤️");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
