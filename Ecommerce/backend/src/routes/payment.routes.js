const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth.middleware');
const {
  createPaymentOrder,
  verifyPayment,
  createRemainingPayment,
  confirmOrder
} = require('../controllers/payment.controller');

// Protected routes
router.post('/create-order', protect, createPaymentOrder);
router.post('/verify', protect, verifyPayment);
router.post('/create-remaining', protect, createRemainingPayment);

// Admin routes
router.put('/confirm-order/:transactionId', protect, admin, confirmOrder);

module.exports = router; 