const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  },
  // Optional: Add logging to see connection attempts
  logger: true,
  debug: true
});

// Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Send email to admin about new order
const sendOrderNotificationEmail = async (orderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: 'New Order Requires Confirmation',
    html: `
      <h1>New Order Requires Confirmation</h1>
      <p>Order ID: ${orderDetails._id}</p>
      <p>Customer: ${orderDetails.user.name}</p>
      <p>Amount: ${orderDetails.totalPrice}</p>
      <p>Please review and confirm this order in the admin dashboard.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order notification email sent to admin');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Send SMS to admin about new order
const sendOrderNotificationSMS = async (orderDetails) => {
  try {
    await twilioClient.messages.create({
      body: `New order #${orderDetails._id} requires confirmation. Amount: ${orderDetails.totalPrice}`,
      to: process.env.ADMIN_PHONE,
      from: process.env.TWILIO_PHONE
    });
    console.log('Order notification SMS sent to admin');
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

// Send payment confirmation email to user
const sendPaymentConfirmationEmail = async (user, orderDetails, paymentType) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Payment ${paymentType === 'initial' ? 'Successful' : 'Completed'}`,
    html: `
      <h1>Payment ${paymentType === 'initial' ? 'Successful' : 'Completed'}</h1>
      <p>Order ID: ${orderDetails._id}</p>
      <p>Amount: ${orderDetails.totalPrice}</p>
      <p>Status: ${paymentType === 'initial' ? 'Initial 50% payment' : 'Remaining 50% payment'}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Payment confirmation email sent to user');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendOrderNotificationEmail,
  sendOrderNotificationSMS,
  sendPaymentConfirmationEmail
}; 