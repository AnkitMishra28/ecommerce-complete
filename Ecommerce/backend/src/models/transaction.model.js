const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Order'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true
  },
  paymentType: {
    type: String,
    enum: ['initial', 'remaining'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending_confirmation', 'confirmed', 'processing', 'completed', 'failed'],
    default: 'pending_confirmation'
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  },
  razorpaySignature: {
    type: String
  },
  adminConfirmed: {
    type: Boolean,
    default: false
  },
  adminConfirmedAt: {
    type: Date
  },
  deliveryConfirmed: {
    type: Boolean,
    default: false
  },
  deliveryConfirmedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema); 