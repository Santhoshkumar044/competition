import { Router } from 'express';
import { googleAuth, googleAuthCallback, logout } from '../controllers/authController.js';

const router = Router();

router.get('/auth/google', googleAuth);
router.get('/auth/google/callback', googleAuthCallback);
router.get('/logout', logout);

export default router;