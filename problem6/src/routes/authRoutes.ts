import { Router } from 'express';
import * as authService from '../auth/auth.service';

const router = Router();

// Define authentication routes
router.post('/login', authService.login);

export default router;