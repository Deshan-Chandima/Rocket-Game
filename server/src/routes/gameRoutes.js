const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Game Engine & Interoperability Routes
router.get('/banana-puzzle', gameController.getBananaPuzzle);
router.post('/save-score', gameController.saveMissionScore);
router.get('/leaderboard', gameController.getLeaderboard);
router.get('/pilot-best/:nickname', gameController.getPilotBest);

module.exports = router;
