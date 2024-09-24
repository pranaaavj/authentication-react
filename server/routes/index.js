import express from 'express';
import userRouter from './user.route.js';
import authRouter from './auth.route.js';
import adminRouter from './admin.route.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', authenticateToken, userRouter);
router.use('/admin', authenticateToken, adminRouter);

export default router;
