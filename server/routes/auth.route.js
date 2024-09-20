import express from 'express';
import {
  signup,
  signin,
  refresh,
  googleSignUp,
} from '../controllers/auth.controller.js';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/google', googleSignUp)
  .get('/refresh', refresh);

export default router;
