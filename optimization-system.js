const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 1. PAGINATION FEED (तेज़ लोडिंग के लिए)
router.get("/feed", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const posts = await mongoose.model("Post").find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // lean() से डेटा बहुत तेज़ आता है क्योंकि यह Mongoose Document नहीं, सीधा JSON देता है

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. BULK UPDATE (एक साथ कई डेटा अपडेट करना)
router.post("/analytics/updateBulk", async (req, res) => {
  const updates = req.body.updates; // [{ postId, views, likes }]
  
  const bulkOps = updates.map(u => ({
    updateOne: {
      filter: { postId: u.postId },
      update: { $inc: { views: u.views, likes: u.likes } }
    }
  }));

  await mongoose.model("Analytics").bulkWrite(bulkOps);
  res.json({ message: "Bulk analytics updated successfully" });
});

module.exports = router;
