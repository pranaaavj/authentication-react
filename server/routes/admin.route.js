import express from 'express';
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/admin.controller.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

router
  .get('/users', getAllUsers)
  .patch('/users/:id', upload.single('image'), updateUser)
  .delete('/users/:id', deleteUser);

export default router;
