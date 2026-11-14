const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Global Middleware
app.use(cors());
app.use(express.json());

// System Health Check
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: `🚀 Space Fuel Authentication Server is running on port ${PORT}`,
    architecture: 'Layered MVC & Event-Driven Architecture (src/)'
  });
});

// Mount Routes
app.use('/api', authRoutes);
app.use('/api/game', gameRoutes);

// Start Express Server
let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(PORT, () => {
    console.log(`🚀 Space Fuel Server listening on port ${PORT}`);
    console.log(`   - Architecture: Modular Layered Architecture (server/src)`);
    console.log(`   - Auth Routes:  /api/register, /api/login, /api/verify-token`);
    console.log(`   - Game Routes:  /api/game/banana-puzzle, /api/game/save-score, /api/game/leaderboard`);
  });
}

module.exports = { app, server };
