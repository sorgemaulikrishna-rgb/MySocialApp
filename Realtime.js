const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app); // HTTP सर्वर को Express से जोड़ना
const io = socketIO(server, { cors: { origin: "*" } });

// बाकी सारे मिडलवेयर्स (Helmet, Compression, etc.) यहाँ आएंगे...
app.use(express.json());
app.use(cors());

// --- SOCKET LOGIC ---
// (यहाँ आपका ऊपर वाला पूरा io.on वाला कोड आएगा)
app.set('socketio', io); // इसे सेट करने से आप दूसरे Routes में भी socket इस्तेमाल कर पाएंगे

// --- ROUTES ---
app.use('/api', require('./profile-system'));
app.use('/api', require('./dm-system'));
// ... बाकी सभी 23 मॉडल्स

// --- START ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Real-time Engine running on port ${PORT}`));
