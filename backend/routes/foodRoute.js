import express from 'express';
import { 
  addFood, 
  listFood, 
  getFood, 
  updateFood, 
  removeFood 
} from '../controllers/foodController.js';
import upload from '../middleware/multer.js';

const foodRouter = express.Router();

// Public routes
foodRouter.get('/list', listFood);
foodRouter.get('/:id', getFood);

// Admin routes (in production, add admin middleware)
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.put('/:id', upload.single('image'), updateFood);
foodRouter.delete('/:id', removeFood);

export default foodRouter;
