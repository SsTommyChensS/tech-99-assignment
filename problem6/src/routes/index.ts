import { Router } from 'express';
import authRoutes from './authRoutes';
import scoreboardRoutes from './scoreboardRoutes';

// Create a router instance
const router = Router();

// Register the routes
router.use('/auth', authRoutes);
router.use('/scoreboard', scoreboardRoutes);

export default router;