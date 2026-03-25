const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- EARNING MODEL ---
const Earning = mongoose.model("Earning", {
  userId: String,
  source: String,      // Ads, Reels Bonus, Shop etc.
  amount: Number,
  currency: { type: String, default: "USD" },
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. ADD EARNING (कमाई जोड़ना)
router.post("/monetization/add", async (req, res) => {
  const { userId, source, amount, currency } = req.body;
  const earning = new Earning({ userId, source, amount, currency });
  await earning.save();
  res.json({ message: "Earning recorded", earning });
});

// 2. GET USER EARNINGS (यूजर की कुल कमाई)
router.get("/monetization/user/:userId", async (req, res) => {
  const earnings = await Earning.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  const totalEarnings = earnings.reduce((acc, e) => acc + (e.amount || 0), 0);
  res.json({ totalEarnings, earnings });
});

// 3. GET EARNINGS BY SOURCE (सोर्स के हिसाब से - जैसे सिर्फ Reels का पैसा)
router.get("/monetization/source/:source", async (req, res) => {
  const earnings = await Earning.find({ source: req.params.source });
  const total = earnings.reduce((acc, e) => acc + (e.amount || 0), 0);
  res.json({ total, earnings });
});

module.exports = router;

