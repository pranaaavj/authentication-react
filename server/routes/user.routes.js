import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router
  .get('/details', authenticateToken(['admin', 'user']), getUser)
  .post(
    '/update/:id',
    authenticateToken(['admin', 'user']),
    upload.single('image'),
    updateUser
  );

export default router;
