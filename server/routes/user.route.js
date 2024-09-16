import express from 'express';
import { test } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware, test);

export default router;
