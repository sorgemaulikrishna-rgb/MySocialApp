const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// रीयल-टाइम फीचर्स के लिए Socket.io (जैसे DM और Live)
const io = new Server(server, {
  cors: { origin: "*" }
});

// Middleware
app.use(cors());
app.use(express.json());

// --- DATABASE CONNECTION ---
// यहाँ अपनी MongoDB URI डालें
mongoose.connect('mongodb://localhost:27017/vibetube')
  .then(() => console.log("VibeTube Database Connected! ✅"))
  .catch(err => console.log("DB Connection Error: ", err));

// --- आपकी फाइल्स को यहाँ जोड़ा जा रहा है (Importing Routes) ---
const authRoutes = require('./auth-system');
const reelRoutes = require('./Reels');
const storyRoutes = require('./StorySystem');
const dmRoutes = require('./dm-system');
const monetizationRoutes = require('./monetization-system');
const profileRoutes = require('./profile-system');
const liveRoutes = require('./live-system');
const searchRoutes = require('./search-system');
const notificationRoutes = require('./notification-system');

// --- API ROUTES को लागू करना (Applying Routes) ---
app.use('/api/auth', authRoutes);
app.use('/api/reels', reelRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/messages', dmRoutes);
app.use('/api/earn', monetizationRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/live', liveRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/notifications', notificationRoutes);

// Socket.io Connection Logic
app.set('socketio', io); // इसे अन्य फाइल्स में use करने के लिए
io.on('connection', (socket) => {
  console.log('User Connected 👤:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User Disconnected ❌');
  });
});

// Server Listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`VibeTube Server is running on port ${PORT} 🚀`);
});
