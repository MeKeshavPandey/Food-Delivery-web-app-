import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name is required'],
    trim: true,
    minlength: [2, 'Food name must be at least 2 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles'],
      message: 'Invalid category'
    }
  },
  available: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true 
});

// Index for faster category and availability queries
foodSchema.index({ category: 1, available: 1 });

const Food = mongoose.model('Food', foodSchema);

export default Food;
