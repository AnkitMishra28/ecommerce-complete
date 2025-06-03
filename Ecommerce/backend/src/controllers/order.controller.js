const asyncHandler = require('express-async-handler');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const { sendOrderNotificationEmail } = require('../utils/notifications');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  // Check if the user is an admin
  if (req.user && req.user.role === 'admin') {
    res.status(403);
    throw new Error('Administrators are not allowed to create orders');
  }

  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  try {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    const createdOrder = await order.save();

    // Send new order notification to admin
    try {
      await sendOrderNotificationEmail(createdOrder);
      console.log('New order notification email sent to admin.');
    } catch (emailError) {
      console.error('Error sending new order notification email:', emailError);
      // Do not re-throw - email failure should not stop order creation
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email phone'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const { status: newStatus } = req.body;
  const currentStatus = order?.status;

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Implement status transition validation
  let isValidTransition = false;
  let shouldUpdatePaymentStatus = false;
  
  switch (currentStatus) {
    case 'pending_confirmation':
      if (newStatus === 'confirmed') {
        isValidTransition = true;
      }
      break;
      
    case 'confirmed':
      if (newStatus === 'processing' && order.isPaid) {
        isValidTransition = true;
      }
      break;
      
    case 'processing':
      if (newStatus === 'shipped') {
        isValidTransition = true;
      } else if (newStatus === 'delivered' && order.isPaid) {
        isValidTransition = true;
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      break;
      
    case 'shipped':
      if (newStatus === 'delivered' && order.isPaid) {
        isValidTransition = true;
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      break;
      
    case 'delivered':
      if (newStatus === 'completed' && order.isPaid && order.isSecondPaid) {
        isValidTransition = true;
      }
      break;
      
    default:
      // Allow cancellation from any non-terminal state
      if (newStatus === 'cancelled' && 
          currentStatus !== 'delivered' && 
          currentStatus !== 'completed') {
        isValidTransition = true;
      }
  }
  
  if (!isValidTransition) {
    res.status(400);
    throw new Error(`Invalid status transition from ${currentStatus} to ${newStatus}. Requires first payment: ${newStatus === 'processing' || newStatus === 'shipped' || newStatus === 'delivered'}. Requires both payments: ${newStatus === 'completed'}. Current payment status: isPaid=${order.isPaid}, isSecondPaid=${order.isSecondPaid}`);
  }

  // Update order status
  order.status = newStatus;
  const updatedOrder = await order.save();

  res.json(updatedOrder);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

// @desc    Get admin dashboard statistics
// @route   GET /api/orders/admin/dashboard-stats
// @access  Private/Admin
const getAdminDashboardStats = asyncHandler(async (req, res) => {
  try {
    // Total Revenue (from fully paid orders)
    const totalRevenueResult = await Order.aggregate([
      { $match: { isPaid: true } }, // Match orders where at least the first payment is done
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

    // Total Users (excluding admins, assuming role 'user' is default)
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });

    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Orders by Status
    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Payment Status Breakdown
    const paymentStatusBreakdown = await Order.aggregate([
        { $group: { 
            _id: null, 
            fullyPaid: { $sum: { $cond: [{ $and: ['$isPaid', '$isSecondPaid'] }, 1, 0] } },
            partiallyPaid: { $sum: { $cond: [{ $and: ['$isPaid', { $not: '$isSecondPaid' }] }, 1, 0] } },
            pendingPayment: { $sum: { $cond: [{ $not: '$isPaid' }, 1, 0] } }
        }}
    ]);

    // Fetch all orders with user info for the table
    const orders = await Order.find({}).populate('user', 'id name email');

    res.json({
      stats: {
        revenue: totalRevenue,
        users: totalUsers,
        orders: totalOrders,
        byStatus: ordersByStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        paymentStatus: paymentStatusBreakdown.length > 0 ? paymentStatusBreakdown[0] : { fullyPaid: 0, partiallyPaid: 0, pendingPayment: 0 }
      },
      orders: orders,
    });
  } catch (error) {
    console.error('Error fetching admin dashboard stats:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message });
  }
});

module.exports = {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  getAdminDashboardStats
}; 