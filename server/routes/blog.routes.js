import express from 'express';
import upload from '../config/multerConfig.js';
import { createBlog } from '../controllers/blog.controller.js';

const router = express.Router();

router.post('/create-blog', upload.single('image'), createBlog);

export default router;
