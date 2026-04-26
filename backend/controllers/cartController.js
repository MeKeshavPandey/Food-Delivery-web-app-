import User from '../models/userModel.js';

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item ID is required' 
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    let cartData = user.cartData || {};

    // Increment quantity or add new item
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    res.status(200).json({
      success: true,
      message: 'Item added to cart',
      cartData
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding to cart' 
    });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Item ID is required' 
      });
    }

    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    let cartData = user.cartData || {};

    // Decrease quantity or remove item
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      
      // Remove item if quantity is 0
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cartData
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error removing from cart' 
    });
  }
};

// Get user cart
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const cartData = user.cartData || {};

    res.status(200).json({
      success: true,
      cartData
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching cart' 
    });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    res.status(200).json({
      success: true,
      message: 'Cart cleared successfully'
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error clearing cart' 
    });
  }
};
