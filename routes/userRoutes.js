const express = require('express');
const router = express.Router();
const { getCurrentUser, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are protected with JWT middleware
router.use(authMiddleware);

// Routes
router.get('/me', getCurrentUser);
router.put('/me', updateProfile);

module.exports = router;
