import express from 'express';
import upload from '../config/multerConfig.js';
import { createBlog, getAllPosts } from '../controllers/blog.controller.js';

const router = express.Router();

router
  .get('/all-posts', getAllPosts)
  .post('/create-blog', upload.single('image'), createBlog);

export default router;
