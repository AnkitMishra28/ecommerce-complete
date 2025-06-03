import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const statusColors = {
  pending_confirmation: 'bg-yellow-600',
  confirmed: 'bg-blue-600',
  shipped: 'bg-purple-600',
  processing: 'bg-orange-500',
  delivered: 'bg-green-600',
  completed: 'bg-green-700',
  cancelled: 'bg-red-600',
  paid: 'bg-green-500',
  default: 'bg-gray-600',
};

const badge = (text, type = 'default') => (
  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[type?.toLowerCase()] || statusColors.default}`}>{text}</span>
);

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/myorders');
        console.log('Orders data received:', data);
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h2 className="text-3xl font-bold mb-8">My Orders</h2>
      <div className="bg-gray-800 rounded-xl p-6 max-w-5xl mx-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Payment</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="text-center py-8">Loading...</td></tr>
            ) : orders.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8">No orders found.</td></tr>
            ) : (
              orders.map(order => (
                <tr key={order._id} className="border-b border-gray-700">
                  <td className="py-3 px-4 font-mono">#{order._id.slice(-6)}</td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{order.status || order.orderStatus || 'Pending Confirmation'}</td>
                  <td className="py-3 px-4">
                    {order.isPaid && order.isSecondPaid ? (
                      badge('Fully Paid', 'paid')
                    ) : (
                      <div className="flex flex-col gap-1">
                          {!order.isPaid && badge('First Payment Pending', 'pending')}
                          {!order.isSecondPaid && badge('Second Payment Pending', 'pending')}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4">₹{order.totalPrice?.toFixed(2) || '0.00'}</td>
                  <td className="py-3 px-4">
                    <Link to={`/order/${order._id}`} className="btn btn-outline btn-sm">View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders; 