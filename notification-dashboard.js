const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- ROUTES ---

// 1. GET SUMMARY (Total, Unread and Recent)
router.get("/dashboard/notifications/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await mongoose.model("Notification").find({ userId }).sort({ createdAt: -1 });

    const unreadCount = notifications.filter(n => !n.read).length;
    const recent = notifications.slice(0, 10);

    res.json({
      totalNotifications: notifications.length,
      unreadCount,
      recentNotifications: recent
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching summary", error: err.message });
  }
});

// 2. MARK ALL AS READ (Bulk Update)
router.post("/dashboard/notifications/readAll/:userId", async (req, res) => {
  const { userId } = req.params;
  await mongoose.model("Notification").updateMany({ userId, read: false }, { $set: { read: true } });
  res.json({ message: "All notifications marked as read" });
});

// 3. DELETE ALL (Bulk Delete)
router.post("/dashboard/notifications/deleteAll/:userId", async (req, res) => {
  const { userId } = req.params;
  await mongoose.model("Notification").deleteMany({ userId });
  res.json({ message: "All notifications deleted" });
});

module.exports = router;
