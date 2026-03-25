const mongoose = require("mongoose");

const StorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  media: { type: String, required: true }, // Image or Video URL
  caption: { type: String, default: "" },
  viewers: [{ type: String }], // User IDs of people who saw it
  createdAt: { type: Date, default: Date.now, expires: 86400 } // 24 hours TTL
});

module.exports = mongoose.model("Story", StorySchema);
