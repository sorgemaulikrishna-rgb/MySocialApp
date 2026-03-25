const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// --- SECURITY SETTINGS MODEL ---
const SecuritySetting = mongoose.model("SecuritySetting", {
  userId: String,
  twoFactorAuth: { type: Boolean, default: false },
  loginAlerts: { type: Boolean, default: true },
  passwordLastChanged: { type: Date, default: Date.now },
  trustedDevices: [{ deviceId: String, deviceName: String, lastUsed: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now }
});

// --- ROUTES ---

// 1. UPDATE SECURITY SETTINGS
router.post("/security/update", async (req, res) => {
  const { userId, twoFactorAuth, loginAlerts } = req.body;

  try {
    let settings = await SecuritySetting.findOne({ userId });
    if (!settings) {
      settings = new SecuritySetting({ userId, twoFactorAuth, loginAlerts });
    } else {
      if (twoFactorAuth !== undefined) settings.twoFactorAuth = twoFactorAuth;
      if (loginAlerts !== undefined) settings.loginAlerts = loginAlerts;
    }

    await settings.save();
    res.json({ message: "Security settings updated 🛡️", settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET SECURITY SETTINGS
router.get("/security/:userId", async (req, res) => {
  const settings = await SecuritySetting.findOne({ userId: req.params.userId });
  if (!settings) return res.status(404).json({ message: "Security settings not found" });
  res.json({ settings });
});

// 3. ADD TRUSTED DEVICE (Login के वक्त इसे कॉल कर सकते हैं)
router.post("/security/device/add", async (req, res) => {
  const { userId, deviceId, deviceName } = req.body;
  const settings = await SecuritySetting.findOne({ userId });
  
  if (!settings) return res.status(404).send("Security settings not found");

  // अगर डिवाइस पहले से है तो उसे अपडेट करें, वरना नया जोड़ें
  const deviceIndex = settings.trustedDevices.findIndex(d => d.deviceId === deviceId);
  if (deviceIndex > -1) {
    settings.trustedDevices[deviceIndex].lastUsed = new Date();
  } else {
    settings.trustedDevices.push({ deviceId, deviceName, lastUsed: new Date() });
  }

  await settings.save();
  res.json({ message: "Device recorded", settings });
});

module.exports = router;
