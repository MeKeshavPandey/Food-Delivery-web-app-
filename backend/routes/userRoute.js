import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected routes
userRouter.get('/profile', authMiddleware, getUserProfile);

export default userRouter;
