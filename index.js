import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// --- अपनी फाइलों को यहाँ जोड़ें (Routes) ---
const likeRoutes = require('./Like'); 
const bookmarkRoutes = require('./Bookmark-save');
const monetizationRoutes = require('./Monetization');
const commentRoutes = require('./COMMENT SYSTEM');

// --- इन रास्तों का इस्तेमाल करें ---
app.use('/api', likeRoutes);
app.use('/api', bookmarkRoutes);
app.use('/api', monetizationRoutes);
app.use('/api', commentRoutes);

// MongoDB कनेक्शन
mongoose.connect('आपका_MONGODB_URL_यहाँ')
  .then(() => console.log("Instagram Backend Connected!"))
  .catch(err => console.log(err));

app.listen(3000, () => console.log("Server running on port 3000"));
