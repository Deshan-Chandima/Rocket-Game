const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'spacefuel_db',
  port: Number(process.env.DB_PORT) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(' Successfully connected to MySQL database: ' + (process.env.DB_NAME || 'spacefuel_db'));
    connection.release();
  } catch (error) {
    console.warn('⚠️  MySQL Connection Notice:', error.message);
    console.warn('👉 Ensure your MySQL service (e.g. XAMPP / WampServer / MySQL service) is running and check your server/.env credentials.');
  }
})();

module.exports = pool;

