import express from 'express';
import userRouter from './user.routes.js';
import authRouter from './auth.routes.js';
import adminRouter from './admin.routes.js';
import blogRouter from './blog.routes.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', authenticateToken(['admin']), adminRouter);
router.use('/user', authenticateToken(['user', 'admin']), userRouter);
router.use('/blog', authenticateToken(['user', 'admin']), blogRouter);

export default router;
