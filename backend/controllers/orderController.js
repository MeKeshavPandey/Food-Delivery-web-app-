import Order from '../models/orderModel.js';
import User from '../models/userModel.js';
import Food from '../models/foodModel.js';

// Place order (Cash on Delivery)
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    // Validate input
    if (!items || !items.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cart is empty' 
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid order amount' 
      });
    }

    if (!address || !address.firstName || !address.email || !address.street || !address.city) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide complete delivery address' 
      });
    }

    // Validate all items exist and are available
    const foodItems = await Food.find({ 
      _id: { $in: items.map(item => item.foodId) } 
    });

    if (foodItems.length !== items.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'Some items in cart are no longer available' 
      });
    }

    // Check if any items are unavailable
    const unavailableItems = foodItems.filter(item => !item.available);
    if (unavailableItems.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: `Some items are currently unavailable: ${unavailableItems.map(i => i.name).join(', ')}` 
      });
    }

    // Create order
    const newOrder = new Order({
      userId: req.userId,
      items,
      amount,
      address,
      paymentMethod: 'Cash on Delivery',
      payment: false // Will be marked true when delivered
    });

    await newOrder.save();

    // Clear user cart after order placement
    await User.findByIdAndUpdate(req.userId, { cartData: {} });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      orderId: newOrder._id
    });

  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error placing order',
      error: error.message 
    });
  }
};

// Verify order (for COD - just confirm order was placed)
export const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order ID is required' 
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Verify order belongs to user
    if (order.userId.toString() !== req.userId) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to access this order' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order confirmed',
      order
    });

  } catch (error) {
    console.error('Verify order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error verifying order' 
    });
  }
};

// Get user orders
export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .populate('items.foodId', 'name price image');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching orders' 
    });
  }
};

// Get all orders (Admin only)
export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .populate('items.foodId', 'name price image');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });

  } catch (error) {
    console.error('List orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error fetching orders' 
    });
  }
};

// Update order status (Admin only)
export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ 
        success: false, 
        message: 'Order ID and status are required' 
      });
    }

    const validStatuses = ['Food Processing', 'Out for Delivery', 'Delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status' 
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    order.status = status;
    
    // Mark payment as true when delivered (COD payment collected)
    if (status === 'Delivered') {
      order.payment = true;
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });

  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating order status' 
    });
  }
};
