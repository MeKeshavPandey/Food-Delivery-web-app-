import Food from '../models/foodModel.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add food item
export const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      // Delete uploaded file if validation fails
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required fields' 
      });
    }

    // Check if image was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload an image' 
      });
    }

    // Create food item
    const food = new Food({
      name,
      description,
      price: Number(price),
      category,
      image: req.file.filename
    });

    await food.save();

    res.status(201).json({
      success: true,
      message: 'Food item added successfully',
      data: food
    });

  } catch (error) {
    console.error('Add food error:', error);
    
    // Delete uploaded file on error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding food item',
      error: error.message 
    });
  }
};

// Get all food items
export const listFood = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category if provided
    if (category && category !== 'All') {
      query.category = category;
    }

    // Search by name if provided
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const foods = await Food.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods
    });

  } catch (error) {
    console.error('List food error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching food items' 
    });
  }
};

// Get single food item
export const getFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ 
        success: false, 
        message: 'Food item not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: food
    });

  } catch (error) {
    console.error('Get food error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching food item' 
    });
  }
};

// Update food item
export const updateFood = async (req, res) => {
  try {
    const { name, description, price, category, available } = req.body;
    
    const food = await Food.findById(req.params.id);

    if (!food) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ 
        success: false, 
        message: 'Food item not found' 
      });
    }

    // Update fields
    if (name) food.name = name;
    if (description) food.description = description;
    if (price) food.price = Number(price);
    if (category) food.category = category;
    if (available !== undefined) food.available = available;

    // Update image if new one uploaded
    if (req.file) {
      // Delete old image
      const oldImagePath = path.join(__dirname, '../uploads', food.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      food.image = req.file.filename;
    }

    await food.save();

    res.status(200).json({
      success: true,
      message: 'Food item updated successfully',
      data: food
    });

  } catch (error) {
    console.error('Update food error:', error);
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating food item' 
    });
  }
};

// Delete food item
export const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ 
        success: false, 
        message: 'Food item not found' 
      });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '../uploads', food.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Food.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Food item deleted successfully'
    });

  } catch (error) {
    console.error('Remove food error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting food item' 
    });
  }
};
