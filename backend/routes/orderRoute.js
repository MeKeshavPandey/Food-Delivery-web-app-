import express from 'express';
import { 
  placeOrder, 
  verifyOrder, 
  userOrders, 
  listOrders, 
  updateStatus 
} from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

// User routes (require authentication)
orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', authMiddleware, verifyOrder);
orderRouter.get('/user', authMiddleware, userOrders);

// Admin routes (in production, add admin middleware)
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);

export default orderRouter;
