import express from 'express';
import {registerUser, loginUser, logoutUser } from '../controllers/authController.js';
import getScores from '../controllers/scoreController.js';

const router = express.Router();

// Register route
router.post('/api/auth/register', registerUser);

// Login route
router.post('/api/auth/login', loginUser);

// Logout route
router.post('/api/auth/logout', logoutUser);

// scores route
router.get('api/scores', getScores);

export default router;
