import express from 'express';
import getAllGamesByUser from '../controllers/allGamesController.js';

const router = express.Router();

router.get('api/allGames', getAllGamesByUser);

export default router;
