import express from 'express';
import { signup, signin, refresh } from '../controllers/auth.controller.js';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/refresh', refresh);

export default router;
