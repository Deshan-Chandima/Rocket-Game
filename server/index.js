const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
let bcrypt;
try {
  bcrypt = require('bcrypt');
} catch (e) {
  bcrypt = require('bcryptjs');
}
require('dotenv').config();

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'spacefuel_super_secret_jwt_key_2026_pilot_auth';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: '🚀 Space Fuel Authentication Server is running on port ' + PORT,
    jwtSecurity: 'Active'
  });
});

/**
 * POST /api/register
 * Request body: { name, nickname, email, password }
 */
app.post('/api/register', async (req, res) => {
  try {
    const { name, nickname, email, password } = req.body;

    // Field validation
    if (!name || !nickname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, nickname, email, password) are required.'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedNickname = nickname.trim();

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    // Check if user already exists
    const [existingUsers] = await db.query(
      'SELECT id FROM users WHERE email = ?',
      [trimmedEmail]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered. Please login.'
      });
    }

    // Hash password with bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save to database
    const [result] = await db.query(
      'INSERT INTO users (name, nickname, email, password) VALUES (?, ?, ?, ?)',
      [trimmedName, trimmedNickname, trimmedEmail, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful! You can now log in.',
      user: {
        id: result.insertId,
        name: trimmedName,
        nickname: trimmedNickname,
        email: trimmedEmail
      }
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during registration.',
      error: error.message
    });
  }
});

/**
 * POST /api/login
 * Request body: { email, password }
 * Authenticates user and issues a cryptographically signed JWT Token
 */
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Find user by email
    const [users] = await db.query(
      'SELECT id, name, nickname, email, password FROM users WHERE email = ?',
      [trimmedEmail]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const user = users[0];

    // Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // Generate cryptographic JWT Token for Virtual Identity verification
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response with signed JWT and sanitized user profile
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during login.',
      error: error.message
    });
  }
});

/**
 * GET /api/verify-token
 * Authenticates the JWT token from the Authorization header to verify
 * whether the genuine authorized pilot is accessing the system.
 */
app.get('/api/verify-token', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'No authorization token provided.'
      });
    }

    // Format: "Bearer <token>"
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    // Verify signature with JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      success: true,
      message: 'Token verified! Pilot identity authenticated.',
      user: {
        id: decoded.id,
        name: decoded.name,
        nickname: decoded.nickname,
        email: decoded.email
      }
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid, tampered, or expired token.',
      error: error.message
    });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Space Fuel Server listening on port ${PORT}`);
  console.log(`   - Register:     POST http://localhost:${PORT}/api/register`);
  console.log(`   - Login:        POST http://localhost:${PORT}/api/login`);
  console.log(`   - Verify Token: GET  http://localhost:${PORT}/api/verify-token`);
});
