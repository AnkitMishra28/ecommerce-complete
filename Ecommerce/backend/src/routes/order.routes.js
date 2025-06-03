const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth.middleware');
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus,
  getAdminDashboardStats
} = require('../controllers/order.controller');

// Protected routes
router.route('/myorders')
  .get(protect, getMyOrders);

router.route('/:id')
  .get(protect, getOrderById);

router.route('/:id/pay')
  .put(protect, updateOrderToPaid);

// Admin routes
router.route('/')
  .get(protect, admin, getOrders)
  .post(protect, createOrder);

router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

// New route for updating order status
router.route('/:id/status')
  .put(protect, admin, updateOrderStatus);

// New route for admin dashboard stats
router.route('/admin/dashboard-stats')
  .get(protect, admin, getAdminDashboardStats);

module.exports = router; 