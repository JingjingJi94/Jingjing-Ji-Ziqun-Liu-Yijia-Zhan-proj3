import express from 'express';
import getScores from '../controllers/scoreController.js';

const router = express.Router();
router.get('api/scores', getScores);

export default router;
