const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Pilot Authentication Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-token', authController.verifyToken);

module.exports = router;
