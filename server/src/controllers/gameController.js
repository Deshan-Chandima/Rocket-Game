const bananaService = require('../services/bananaService');
const scoreService = require('../services/scoreService');
const gameEvents = require('../events/gameEvents');

/**
 * Fetch Banana Puzzle (Prof. Marc Conrad API + Fallback)
 * GET /api/game/banana-puzzle
 */
const getBananaPuzzle = async (req, res) => {
  try {
    const puzzle = await bananaService.fetchBananaPuzzle();
    return res.status(200).json(puzzle);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve puzzle data',
      error: error.message
    });
  }
};

/**
 * Save Pilot Mission Score
 * POST /api/game/save-score
 */
const saveMissionScore = async (req, res) => {
  try {
    const { userId, nickname, score, level } = req.body;
    if (!nickname || score === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing score payload'
      });
    }

    await scoreService.recordScore({ userId, nickname, score, level });

    // Emit event
    gameEvents.emit('scoreRecorded', {
      userId,
      nickname,
      score,
      level
    });

    return res.status(200).json({
      success: true,
      message: 'Mission score recorded!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Could not record score',
      error: error.message
    });
  }
};

/**
 * Get Global Leaderboard
 * GET /api/game/leaderboard
 */
const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await scoreService.fetchLeaderboard();
    return res.status(200).json({
      success: true,
      leaderboard
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Leaderboard unavailable',
      error: error.message
    });
  }
};

/**
 * Get Pilot Personal Best
 * GET /api/game/pilot-best/:nickname
 */
const getPilotBest = async (req, res) => {
  try {
    const { nickname } = req.params;
    const topScore = await scoreService.fetchPilotPersonalBest(nickname);
    return res.status(200).json({
      success: true,
      topScore
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      topScore: 0
    });
  }
};

module.exports = {
  getBananaPuzzle,
  saveMissionScore,
  getLeaderboard,
  getPilotBest
};
