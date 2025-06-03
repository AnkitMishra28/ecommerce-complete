# E-commerce Backend

This is the backend server for the e-commerce application. It's built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization
- Product management
- Order processing
- Admin dashboard
- RESTful API
- Two-step payment system (50% upfront, 50% after delivery)
- Admin confirmation flow
- Email and SMS notifications
- Real-time updates using WebSocket

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- Razorpay account
- Twilio account (for SMS)
- Email service (Gmail, SendGrid, etc.)

## Installation

1. Clone the repository
2. Navigate to the backend directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the root directory and add the following variables:
   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173

   # Database
   MONGODB_URI=mongodb://localhost:27017/ecommerce

   # JWT
   JWT_SECRET=your_jwt_secret_key_here

   # Razorpay
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   # Email (Gmail example)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_specific_password
   ADMIN_EMAIL=admin@example.com

   # Twilio
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE=your_twilio_phone_number
   ADMIN_PHONE=admin_phone_number
   ```

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Users
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile
- PUT /api/users/profile - Update user profile
- GET /api/users - Get all users (admin only)
- DELETE /api/users/:id - Delete user (admin only)
- GET /api/users/:id - Get user by ID (admin only)
- PUT /api/users/:id - Update user (admin only)

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get single product
- POST /api/products - Create a product (admin only)
- PUT /api/products/:id - Update a product (admin only)
- DELETE /api/products/:id - Delete a product (admin only)
- POST /api/products/:id/reviews - Create new review
- GET /api/products/top - Get top rated products

### Orders
- POST /api/orders - Create new order
- GET /api/orders/:id - Get order by ID
- PUT /api/orders/:id/pay - Update order to paid
- PUT /api/orders/:id/deliver - Update order to delivered (admin only)
- GET /api/orders/myorders - Get logged in user orders
- GET /api/orders - Get all orders (admin only)

### Payments
- POST /api/payments/create-order - Create initial payment order (50%)
- POST /api/payments/verify - Verify payment
- POST /api/payments/create-remaining - Create remaining payment order (50%)
- PUT /api/payments/confirm-order/:transactionId - Admin confirm order

## Payment Flow

1. User initiates purchase:
   - Frontend calls `/api/payments/create-order`
   - Backend creates Razorpay order for 50% of total
   - Admin receives email and SMS notification

2. Admin Confirmation:
   - Admin reviews order in dashboard
   - Admin confirms order via `/api/payments/confirm-order/:transactionId`
   - User receives confirmation email
   - Frontend receives real-time update via WebSocket

3. Initial Payment:
   - User completes 50% payment through Razorpay
   - Frontend verifies payment via `/api/payments/verify`
   - Order status updated to confirmed

4. Delivery and Remaining Payment:
   - Admin marks order as delivered
   - User initiates remaining 50% payment
   - Frontend calls `/api/payments/create-remaining`
   - User completes payment through Razorpay

## WebSocket Events

### Admin Events
- `join-admin` - Admin joins admin room
- `new-order` - New order notification
- `order-confirmed` - Order confirmation notification

### User Events
- `join-user` - User joins their room
- `order-status-update` - Order status update
- `payment-confirmation` - Payment confirmation

## Error Handling

The API uses a consistent error response format:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
``` 