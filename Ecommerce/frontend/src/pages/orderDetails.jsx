import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from '../utils/axios';
import toast from 'react-hot-toast';

const statusColors = {
  pending: 'bg-yellow-600',
  confirmed: 'bg-blue-600',
  shipped: 'bg-purple-600',
  processing: 'bg-orange-500',
  delivered: 'bg-green-600',
  completed: 'bg-green-700',
  paid: 'bg-green-500',
  default: 'bg-gray-600',
};

const badge = (text, type = 'default') => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[type] || statusColors.default}`}>{text}</span>
);

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [payLoading, setPayLoading] = useState(false);
  const [payLoading2, setPayLoading2] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAdmin = user?.role === 'admin';
  const isAdminOrderView = location.pathname.startsWith('/admin/order');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log('Fetching order details for ID:', id);
        const { data } = await axios.get(`/api/orders/${id}`);
        console.log('Order data fetched:', data);
        setOrder(data);
      } catch (err) {
        console.error('Error fetching order details:', err);
        toast.error('Order not found');
        // Redirect admin to admin dashboard and user to my orders on error
        if (isAdmin) {
             navigate('/admin/dashboard');
         } else {
            navigate('/my-orders');
         }
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
    // Poll for status updates every 10s
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [id, navigate, refresh, isAdmin]);

  // Razorpay payment handler
  const handleRazorpayPayment = async (type) => {
    if (!order) return;
    if (type === 'first') setPayLoading(true);
    if (type === 'second') setPayLoading2(true);
    
    // Add test log
    console.log('Environment test:', {
      nodeEnv: import.meta.env.MODE,
      isDev: import.meta.env.DEV,
      isProd: import.meta.env.PROD,
      hasKey: !!import.meta.env.VITE_RAZORPAY_KEY_ID,
      keyLength: import.meta.env.VITE_RAZORPAY_KEY_ID?.length
    });
    
    try {
      // Create payment order on backend
      const { data } = await axios.post(
        type === 'first' ? '/api/payments/create-order' : '/api/payments/create-remaining',
        { orderId: order._id }
      );
      
      console.log('Raw VITE_RAZORPAY_KEY_ID:', import.meta.env.VITE_RAZORPAY_KEY_ID);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'Ecommerce',
        description: 'Order Payment',
        order_id: data.orderId,
        handler: async function (response) {
          try {
            await axios.post('/api/payments/verify', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              transactionId: data.transactionId
            });
            toast.success(type === 'first' ? 'First payment done!' : 'Second payment done!');
            setRefresh(r => !r);
          } catch (err) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          email: order.user?.email,
          contact: order.user?.phone
        },
        theme: { color: '#10b981' }
      };
      console.log('Using Razorpay Key ID:', options.key);
      if (!options.key) {
        console.error('Razorpay Key ID is undefined or missing.');
        toast.error('Razorpay key is not configured.');
        return;
      }
      if (typeof window.Razorpay === 'undefined') {
         console.error('Razorpay script is not loaded. window.Razorpay is undefined.');
         toast.error('Payment script not loaded.');
         return;
      }
      try {
        const rzp = new window.Razorpay(options);
        rzp.open();
        console.log('Razorpay modal should be opening.');
      } catch (razorpayInstanceError) {
        console.error('Error creating or opening Razorpay instance:', razorpayInstanceError);
        toast.error('Failed to open payment modal.');
      }
    } catch (err) {
      toast.error('Payment initiation failed');
    } finally {
      setPayLoading(false);
      setPayLoading2(false);
    }
  };

  if (loading) {
    console.log('OrderDetails loading...');
    return <div className="text-white p-8">Loading...</div>;
  }
  if (!order) {
     console.log('OrderDetails: Order is null after loading.');
      return null;
  }

  console.log('Rendering OrderDetails for order:', order);

  // Payment status logic
  const isFirstPaymentPending = !order.isPaid;
  const isSecondPaymentPending = order.isPaid && !order.isDelivered && !order.isSecondPaid;
  const canPaySecond = order.isDelivered && order.isPaid && !order.isSecondPaid; // Ensure first payment is also done
  const isConfirmed = order.status?.toLowerCase() === 'confirmed'; // Exact match for confirmed status

  // Modern status mapping
  const statusMap = {
    pending_confirmation: badge('Pending Confirmation', 'pending'),
    confirmed: badge('Confirmed', 'confirmed'),
    shipped: badge('Shipped', 'shipped'),
    processing: badge('Processing', 'processing'),
    delivered: badge('Delivered', 'delivered'),
    completed: badge('Completed', 'completed'),
    first_payment_done: badge('First Payment Done', 'paid'),
    fully_paid: badge('Fully Paid', 'paid'),
    default: badge(order.status || 'Pending', 'default'),
  };

  const paymentBadge = () => {
    if (order.isPaid && order.isSecondPaid) return badge('Fully Paid', 'paid');
    if (order.isPaid && !order.isSecondPaid) return badge('First Payment Done, Second Pending', 'pending');

    // If order is pending confirmation, only show first payment pending
    if (order.status?.toLowerCase() === 'pending_confirmation') {
        return badge('First Payment Pending', 'pending');
    }

    // Display both pending if neither is done and status is confirmed or later
    if (!order.isPaid && !order.isSecondPaid && order.status?.toLowerCase() !== 'pending_confirmation') return (
      <div className="flex flex-col gap-1">
        {badge('First Payment Pending', 'pending')}
        {badge('Second Payment Pending', 'pending')}
      </div>
    );

    return badge('Pending', 'default'); // Fallback
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Order Details</h2>
        <button onClick={() => navigate('/my-orders')} className="btn btn-outline">Back to Dashboard</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column: Order Status, Summary, Delivery */}
        <div>
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Order Status</h3>
            <div className="text-lg mb-2">{statusMap[order.status?.toLowerCase()] || statusMap.default}</div>
            {/* Show Update Status button only for admin view, but disabled on order details page */}
            {isAdminOrderView && (
                 <button
                    className="btn btn-sm btn-primary mt-2"
                    disabled={true} // Disable on this page
                 >
                    Update Status
                 </button>
            )}
          </div>
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
            <div className="mb-2">Order ID: <span className="font-mono">{order._id}</span></div>
            <div className="mb-2">Date: {new Date(order.createdAt).toLocaleDateString()}</div>
            <div className="mb-2">Total Amount: ₹{order.totalPrice?.toFixed(2)}</div>
            <div className="mt-4">
              <div className="font-semibold mb-1">Payment Status</div>
              {paymentBadge()}
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Delivery Information</h3>
            <div>Street: <span className="text-gray-200">{order.shippingAddress?.street}</span></div>
            <div>City: <span className="text-gray-200">{order.shippingAddress?.city}</span></div>
            <div>State: <span className="text-gray-200">{order.shippingAddress?.state}</span></div>
            <div>ZIP Code: <span className="text-gray-200">{order.shippingAddress?.zipCode}</span></div>
          </div>
        </div>
        {/* Right Column: Items and Payment Sections */}
        <div>
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Items</h3>
            {order.orderItems?.map((item, idx) => (
              <div key={idx} className="flex items-center mb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-400">Qty: {item.quantity}</div>
                  <div className="text-green-400 font-bold">₹{item.price?.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Payment Section - Show only for non-admin users */}
          {!isAdminOrderView && (
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold mb-2 text-green-400">First Payment (50%)</h3>
              <div className="mb-2 font-semibold">Complete First Payment</div>

              {/* Show message only if status is pending_confirmation and first payment is pending */}
              {order.status?.toLowerCase() === 'pending_confirmation' && !order.isPaid && (
                  <div className="mb-2 text-yellow-400 font-medium">First payment is available after admin confirmation.</div>
              )}

              {/* Show button if confirmed and first payment is pending and not cancelled */}
              {order.status?.toLowerCase() === 'confirmed' && isFirstPaymentPending && !order.isCancelled && (
                 <button
                   className="btn btn-success w-full mb-4"
                   onClick={() => handleRazorpayPayment('first')}
                   disabled={payLoading}
                 >
                   {payLoading ? 'Processing...' : `Pay ₹${(order.totalPrice / 2).toFixed(2)} with Razorpay`}
                 </button>
              )}
               {/* Show First Payment Done status if isPaid is true (only if status is not pending confirmation)*/}
              {order.isPaid && order.status?.toLowerCase() !== 'pending_confirmation' && (
                  <div className="mb-2 text-green-400 font-medium">First Payment Done</div>
              )}
            </div>
          )}

          {/* Second Payment Section - Show only for non-admin users */}
           {!isAdminOrderView && (
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">Second Payment (50%)</h3>

              {/* Show message if second payment is pending but not yet delivered/ready */}
              {order.isPaid && !order.isDelivered && !order.isSecondPaid && order.status?.toLowerCase() !== 'completed' && (
                  <div className="mb-2 text-gray-400 font-medium">Second payment will be available after delivery.</div>
              )}

              {/* Show button only if delivered, first payment done, and second payment pending */}
              {order.status?.toLowerCase() === 'delivered' && order.isPaid && !order.isSecondPaid && !order.isCancelled && (
                 <button
                   className="btn btn-warning w-full"
                   onClick={() => handleRazorpayPayment('second')}
                   // Enable and show button only if delivered, first payment done, and second payment pending
                   disabled={payLoading2}
                 >
                    {payLoading2 ? 'Processing...' : `Pay ₹${(order.totalPrice / 2).toFixed(2)} with Razorpay`}
                  </button>
               )}
                {/* Show Second Payment Done status if isSecondPaid is true */}
                {order.isSecondPaid && order.status?.toLowerCase() !== 'completed' && (
                  <div className="mb-2 mt-2 text-green-400 font-medium">Second Payment Done</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails; 