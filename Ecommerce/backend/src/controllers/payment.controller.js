const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/transaction.model');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const { sendOrderNotificationEmail, sendOrderNotificationSMS, sendPaymentConfirmationEmail } = require('../utils/notifications');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create initial payment order
// @route   POST /api/payments/create-order
// @access  Private
const createPaymentOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  // Find the order
  const order = await Order.findById(orderId).populate('user');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  console.log('Order found for payment creation:', order._id);

  // Calculate initial payment (50% of total)
  const initialAmount = Math.round(order.totalPrice * 0.5 * 100); // Convert to paise
  console.log('Initial amount calculated:', initialAmount);

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: initialAmount,
    currency: 'INR',
    receipt: `order_${orderId}_initial`
  });
  console.log('Razorpay order created:', razorpayOrder.id);

  // Create transaction record
  const transaction = await Transaction.create({
    order: orderId,
    user: req.user._id,
    amount: initialAmount / 100, // Convert back to rupees
    paymentType: 'initial',
    razorpayOrderId: razorpayOrder.id,
    status: 'pending_confirmation'
  });
  console.log('Transaction record created:', transaction._id);

  // Send notifications to admin (but don't block on failure)
  try {
    await sendOrderNotificationEmail(order);
    await sendOrderNotificationSMS(order);
    console.log('Order notifications sent.');
  } catch (notificationError) {
    console.error('Error sending order notifications:', notificationError);
    // Continue execution even if notifications fail
  }

  res.status(201).json({
    success: true,
    orderId: razorpayOrder.id,
    amount: initialAmount,
    currency: 'INR',
    transactionId: transaction._id
  });
});

// @desc    Verify and process payment
// @route   POST /api/payments/verify
// @access  Private
const verifyPayment = asyncHandler(async (req, res) => {
  const {
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    transactionId
  } = req.body;

  // Verify signature
  const body = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature !== razorpaySignature) {
    res.status(400);
    throw new Error('Invalid payment signature');
  }

  // Update transaction
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  // Update transaction status
  transaction.razorpayPaymentId = razorpayPaymentId;
  transaction.razorpaySignature = razorpaySignature;
  transaction.status = 'completed';
  await transaction.save();

  // Update order payment status
  const order = await Order.findById(transaction.order);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  console.log('Order before payment status update:', { isPaid: order.isPaid, isSecondPaid: order.isSecondPaid, status: order.status });
  console.log('Transaction payment type:', transaction.paymentType);

  if (transaction.paymentType === 'initial') {
    order.isPaid = true;
    order.paidAt = Date.now();
    console.log('Marking first payment as done.');
  } else if (transaction.paymentType === 'remaining') {
    order.isSecondPaid = true;
    console.log('Marking second payment as done.');
    console.log('isSecondPaid set to true for remaining payment logic.', { isPaid: order.isPaid, isSecondPaid: order.isSecondPaid });
  }

  console.log('Order after payment status update logic:', { isPaid: order.isPaid, isSecondPaid: order.isSecondPaid, status: order.status });

  await order.save();

  // Add log after saving the order
  console.log('Order saved successfully after payment verification. Saved status:', { id: order._id, isPaid: order.isPaid, isSecondPaid: order.isSecondPaid, status: order.status });

  // Send confirmation email to user (keep try-catch as it's not critical)
  try {
     const populatedOrder = await Order.findById(order._id).populate('user');
     await sendPaymentConfirmationEmail(populatedOrder.user, populatedOrder, transaction.paymentType);
     console.log('Payment confirmation email sent.');
  } catch (emailError) {
     console.error('Error sending payment confirmation email:', emailError);
  }

  res.json({
    success: true,
    message: 'Payment verified successfully',
    order: order // Send the updated order object
  });
});

// @desc    Create remaining payment order
// @route   POST /api/payments/create-remaining
// @access  Private
const createRemainingPayment = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  const order = await Order.findById(orderId).populate('user');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Check if order is delivered
  if (!order.isDelivered) {
    res.status(400);
    throw new Error('Order must be delivered before remaining payment');
  }

  // Calculate remaining payment (50% of total)
  const remainingAmount = Math.round(order.totalPrice * 0.5 * 100); // Convert to paise

  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: remainingAmount,
    currency: 'INR',
    receipt: `order_${orderId}_remaining`
  });

  // Create transaction record
  const transaction = await Transaction.create({
    order: orderId,
    user: req.user._id,
    amount: remainingAmount / 100, // Convert back to rupees
    paymentType: 'remaining',
    razorpayOrderId: razorpayOrder.id,
    status: 'processing'
  });

  res.status(201).json({
    success: true,
    orderId: razorpayOrder.id,
    amount: remainingAmount,
    currency: 'INR',
    transactionId: transaction._id
  });
});

// @desc    Admin confirm order
// @route   PUT /api/payments/confirm-order/:transactionId
// @access  Private/Admin
const confirmOrder = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.transactionId)
    .populate('order')
    .populate('user');

  if (!transaction) {
    res.status(404);
    throw new Error('Transaction not found');
  }

  transaction.adminConfirmed = true;
  transaction.adminConfirmedAt = Date.now();
  transaction.status = 'confirmed';
  await transaction.save();

  // Send confirmation email to user
  await sendPaymentConfirmationEmail(transaction.user, transaction.order, 'initial');

  res.json({
    success: true,
    message: 'Order confirmed successfully'
  });
});

module.exports = {
  createPaymentOrder,
  verifyPayment,
  createRemainingPayment,
  confirmOrder
}; 