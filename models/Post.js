const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  caption: { type: String, default: "" },
  likes: [{ type: String }], // User IDs of people who liked
  comments: [
    {
      userId: { type: String },
      text: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);
