// routes/scoreboardRoutes.ts
import { Router } from 'express';
import * as scoreboardService from '../scoreboard/scoreboard.service';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Define scoreboard routes
router.post('/update', authenticateToken, scoreboardService.updateScore);
router.get('/', scoreboardService.getTopScores);

export default router;
