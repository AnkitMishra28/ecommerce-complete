const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
});

// Send order confirmation email to admin
exports.sendOrderConfirmationEmail = async (order) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: adminEmail,
    subject: 'New Order Requires Confirmation',
    html: `
      <h1>New Order Received</h1>
      <p>Order ID: ${order._id}</p>
      <p>Customer Name: ${order.user?.name || 'Not Available'}</p>
      <p>Customer Email: ${order.user?.email || 'Not Available'}</p>
      <p>Customer Phone: ${order.user?.phone || 'Not Available'}</p>
      <p>Total Amount: ₹${order.totalAmount.toFixed(2)}</p>
      <p>First Payment Amount: ₹${order.paymentStatus.firstPayment.amount.toFixed(2)}</p>
      <p>Please review and confirm this order.</p>
      <p>Order Details:</p>
      <ul>
        ${order.products.map(item => `
          <li>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price.toFixed(2)}</li>
        `).join('')}
      </ul>
      <p>Delivery Address:</p>
      <p>
        ${order.deliveryAddress.street}<br>
        ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.zipCode}
      </p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to admin');
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

// Send payment confirmation email to admin
exports.sendPaymentConfirmationEmail = async (order, paymentType) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_EMAIL;
  const paymentInfo = paymentType === 'first' ? order.paymentStatus.firstPayment : order.paymentStatus.secondPayment;

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: adminEmail,
    subject: `Payment Confirmation - ${paymentType === 'first' ? 'First' : 'Second'} Payment`,
    html: `
      <h1>Payment Confirmation</h1>
      <p>Order ID: ${order._id}</p>
      <p>Customer Name: ${order.user?.name || 'Not Available'}</p>
      <p>Customer Email: ${order.user?.email || 'Not Available'}</p>
      <p>Payment Type: ${paymentType === 'first' ? 'First' : 'Second'} Payment</p>
      <p>Amount Paid: ₹${paymentInfo.amount.toFixed(2)}</p>
      <p>Payment Status: ${paymentInfo.status}</p>
      <p>Payment Date: ${new Date().toLocaleString()}</p>
      <p>Order Status: ${order.status}</p>                     
      <p>Order Details:</p>
      <ul>
        ${order.products.map(item => `
          <li>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price.toFixed(2)}</li>
        `).join('')}
      </ul>
      <p>Total Order Amount: ₹${order.totalAmount.toFixed(2)}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Payment confirmation email sent to admin for ${paymentType} payment`);
  } catch (error) {
    console.error(`Error sending payment confirmation email:`, error);
    throw error;
  }
};

// Send order status update email to customer
exports.sendOrderStatusEmail = async (order, status) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    from: `"Bakery Admin" <${process.env.SMTP_EMAIL}>`,
    to: order.user.email,
    subject: `Order Status Update - ${status}`,
    html: `
      <h1>Order Status Update</h1>
      <p>Dear ${order.user?.name || 'Customer'},</p>
      <p>Your order #${order._id} status has been updated to: <strong>${status}</strong></p>
      ${status === 'confirmed' ? `
        <p>Your order has been confirmed by our team! Please proceed with the first payment of ₹${order.paymentStatus.firstPayment.amount.toFixed(2)}.</p>
        <p>Pay here: <a href='http://localhost:5173/order/${order._id}'>View Order & Pay</a></p>
      ` : ''}
      ${status === 'processing' ? `
        <p>Our team is now processing your order. We'll keep you updated on the progress.</p>
      ` : ''}
      ${status === 'shipped' ? `
        <p>Great news! Your order has been shipped and is on its way to you.</p>
      ` : ''}
      ${status === 'delivered' ? `
        <p>Your order has been delivered! Please complete the remaining payment of ₹${order.paymentStatus.secondPayment.amount.toFixed(2)}.</p>
        <p>Pay here: <a href='http://localhost:5173/order/${order._id}'>Complete Payment</a></p>
      ` : ''}
      ${status === 'cancelled' ? `
        <p>Your order has been cancelled. If you have any questions, please contact our support team.</p>
      ` : ''}
      <p>Order Summary:</p>
      <ul>
        ${order.products.map(item => `
          <li>${item.name} - Quantity: ${item.quantity} - Price: ₹${item.price.toFixed(2)}</li>
        `).join('')}
      </ul>
      <p>Total Amount: ₹${order.totalAmount.toFixed(2)}</p>
      <p>Thank you for choosing our bakery!</p>
      <p>Best regards,<br>Bakery Admin Team</p>
    `
  };

  try {
    console.log('[EMAIL] Sending to:', mailOptions.to, 'Subject:', mailOptions.subject);
    await transporter.sendMail(mailOptions);
    console.log('[EMAIL] Order status email sent to customer');
  } catch (error) {
    console.error('[EMAIL] Error sending order status email:', error);
    throw error;
  }
}; 