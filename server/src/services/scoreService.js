const db = require('../config/db');

/**
 * Ensures the scores table is present in the database.
 */
const ensureScoresTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS scores (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NULL,
      nickname VARCHAR(50) NOT NULL,
      score INT NOT NULL,
      level INT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

/**
 * Inserts a new flight score entry.
 */
const recordScore = async ({ userId, nickname, score, level }) => {
  await ensureScoresTable();
  const [result] = await db.query(
    'INSERT INTO scores (user_id, nickname, score, level) VALUES (?, ?, ?, ?)',
    [userId || null, nickname, score, level || 1]
  );
  return result;
};

/**
 * Fetches the top 10 highest personal best scores.
 */
const fetchLeaderboard = async () => {
  await ensureScoresTable();
  const [rows] = await db.query(`
    SELECT 
      nickname, 
      MAX(score) AS score, 
      MAX(level) AS level, 
      MAX(created_at) AS created_at 
    FROM scores 
    GROUP BY nickname 
    ORDER BY score DESC 
    LIMIT 10
  `);
  return rows;
};

/**
 * Fetches the highest recorded score for a single pilot.
 */
const fetchPilotPersonalBest = async (nickname) => {
  await ensureScoresTable();
  const [rows] = await db.query(
    'SELECT MAX(score) AS topScore FROM scores WHERE nickname = ?',
    [nickname]
  );
  return rows[0]?.topScore || 0;
};

module.exports = {
  recordScore,
  fetchLeaderboard,
  fetchPilotPersonalBest
};
