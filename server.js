const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// 1. Static Files (Photos/Videos के लिए)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 2. Database Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialapp";
mongoose.connect(MONGO_URI)
  .then(() => console.log("Database Connected Successfully ✅"))
  .catch(err => console.log("DB Error: ", err));

// 3. MODELS (User और Post को यहीं रहने दें ताकि बाकी फाइलें इस्तेमाल कर सकें)
const User = mongoose.model("User", {
  username: String, email: String, followers: [String], following: [String]
});
const Post = mongoose.model("Post", {
  userId: String, image: String, videoUrl: String, caption: String, 
  likes: [String], shares: [String], comments: Array
});

// 4. IMPORT ALL MODULES (अपनी बनाई हुई फाइलों को यहाँ जोड़ें)
app.use('/api', require('./Like'));
app.use('/api', require('./dm-system'));
app.use('/api', require('./comment-system'));
app.use('/api', require('./share-system'));
app.use('/api', require('./Reels'));
app.use('/api', require('./ai-system'));
app.use('/api', require('./ar-system'));
app.use('/api', require('./analytics-system'));
app.use('/api', require('./dashboard-system'));
app.use('/api', require('./settings-system'));
app.use('/api', require('./Bookmark-save'));
app.use('/api', require('./Monetization'));

// 5. Basic Route
app.get("/", (req, res) => res.send("Instagram Backend API is Live 🚀"));

// 6. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
