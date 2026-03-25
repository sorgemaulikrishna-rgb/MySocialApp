const mongoose = require("mongoose");

const ReelSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  videoUrl: { type: String, required: true },
  caption: { type: String, default: "" },
  likes: [{ type: String }],
  comments: [
    {
      userId: { type: String },
      text: { type: String },
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reel", ReelSchema);
