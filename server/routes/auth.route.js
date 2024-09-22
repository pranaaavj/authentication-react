import {
  signup,
  signin,
  refresh,
  googleSignUp,
} from '../controllers/auth.controller.js';
import express from 'express';
import upload from '../config/multerConfig.js';

const router = express.Router();

router
  .post('/signup', upload.single('image'), signup)
  .post('/signin', signin)
  .post('/google', googleSignUp)
  .get('/refresh', refresh);

export default router;
