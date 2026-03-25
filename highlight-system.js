const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- HIGHLIGHT MODEL ---
const Highlight = mongoose.model("Highlight", {
  userId: String,       
  title: String,        
  coverImage: String,   
  stories: [String],    
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. CREATE HIGHLIGHT
router.post("/highlights/create", async (req, res) => {
  const { userId, title, coverImage, stories } = req.body;
  const highlight = new Highlight({ userId, title, coverImage, stories });
  await highlight.save();
  res.json({ message: "Highlight created", highlight });
});

// 2. GET HIGHLIGHTS OF USER
router.get("/highlights/:userId", async (req, res) => {
  const highlights = await Highlight.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  res.json({ total: highlights.length, highlights });
});

// 3. ADD STORY TO HIGHLIGHT
router.post("/highlights/addStory/:highlightId", async (req, res) => {
  const { storyId } = req.body;
  const highlight = await Highlight.findById(req.params.highlightId);
  if (!highlight) return res.status(404).send("Highlight not found");

  highlight.stories.push(storyId);
  await highlight.save();
  res.json({ message: "Story added to highlight", highlight });
});

// 4. DELETE HIGHLIGHT
router.post("/highlights/delete/:highlightId", async (req, res) => {
  await Highlight.findByIdAndDelete(req.params.highlightId);
  res.json({ message: "Highlight deleted" });
});

module.exports = router;
