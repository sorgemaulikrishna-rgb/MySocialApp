const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- NOTIFICATION MODEL ---
const Notification = mongoose.model("Notification", {
  userId: String,        
  senderId: String,      
  type: String,          // like, comment, follow, share, mention
  postId: String,        
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// --- HELPER FUNCTION (दूसरे मॉड्यूल्स के लिए) ---
const createNotification = async ({ userId, senderId, type, postId }) => {
  const notification = new Notification({ userId, senderId, type, postId });
  await notification.save();
  return notification;
};

// --- ROUTES ---

// 1. GET NOTIFICATIONS
router.get("/notifications/:userId", async (req, res) => {
  const notifications = await Notification.find({ userId: req.params.userId })
    .sort({ createdAt: -1 })
    .limit(50);
  res.json({ total: notifications.length, notifications });
});

// 2. MARK AS READ
router.post("/notifications/read/:notificationId", async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.notificationId, 
    { read: true }, 
    { new: true }
  );
  res.json({ message: "Read", notification });
});

// 3. DELETE NOTIFICATION
router.delete("/notifications/:notificationId", async (req, res) => {
  await Notification.findByIdAndDelete(req.params.notificationId);
  res.json({ message: "Notification deleted" });
});

module.exports = { router, createNotification };
