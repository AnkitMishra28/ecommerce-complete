import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaSpinner, FaShoppingCart, FaUsers, FaDollarSign, FaLock } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { BiPackage } from 'react-icons/bi';

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

const AdminDashboard = () => {
  const [stats, setStats] = useState({ revenue: 0, users: 0, orders: 0, byStatus: {}, paymentStatus: { fullyPaid: 0, partiallyPaid: 0, pendingPayment: 0 } });
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/orders/admin/dashboard-stats');
      setStats(data.stats);
      setOrders(data.orders);
    } catch (err) {
      toast.error('Failed to load dashboard');
      console.error('Error fetching admin dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/users/admin'); // Assuming an API endpoint for admin users
      setUsers(data.users);
    } catch (err) {
      toast.error('Failed to load users');
      console.error('Error fetching admin users:', err);
      setUsers([]); // Clear users on error
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setActionLoading(orderId + newStatus);
    try {
      await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
      toast.success(`Order marked as ${newStatus}`);
      // Update the order status in the local state
      setOrders(orders => orders.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      // Close the modal if it's open
      setIsModalOpen(false);
      setCurrentOrder(null);
      // Refresh stats after status change
      fetchStats();
    } catch (err) {
      toast.error('Failed to update order status');
      console.error('Error updating order status:', err);
    } finally {
      setActionLoading('');
    }
  };

  const openStatusModal = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  // Logic to determine if a status option is disabled
  const isStatusDisabled = (order, statusOption) => {
    const currentStatus = order.status?.toLowerCase();
    const isFirstPaymentDone = order.isPaid;
    const isFullyPaid = order.isPaid && order.isSecondPaid;

    switch (statusOption) {
      case 'confirmed':
        // Can only confirm from pending_confirmation
        return currentStatus !== 'pending_confirmation';
      case 'processing':
        // Can only process after confirmed and first payment is done
        return !(currentStatus === 'confirmed' && isFirstPaymentDone);
      case 'shipped':
        // Can only ship after processing
        return currentStatus !== 'processing';
      case 'delivered':
        // Can only be delivered after shipped/processing and first payment is done
        return !(isFirstPaymentDone && (currentStatus === 'processing' || currentStatus === 'shipped'));
      case 'cancelled':
        // Cannot cancel if delivered or completed
        return currentStatus === 'delivered' || currentStatus === 'completed';
      case 'pending_confirmation':
        // Cannot manually set back to pending_confirmation from other states
        return currentStatus !== 'pending_confirmation'; // Disable if not current status
      default:
        // Disable any other unexpected status options
        return true;
    }
  };

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Total Orders Card */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-white">Total Orders</div>
            <FaLock className="text-blue-400 text-2xl" />
          </div>
          <div className="text-3xl font-bold text-blue-400">{stats.orders || 0}</div>
           <div className="mt-4 text-sm space-y-1">
             <div className="flex justify-between items-center text-yellow-400">
                <span>Pending:</span>
                <span>{stats.byStatus?.pending_confirmation || 0}</span>
             </div>
              <div className="flex justify-between items-center text-orange-500">
                <span>Processing:</span>
                <span>{stats.byStatus?.processing || 0}</span>
             </div>
              <div className="flex justify-between items-center text-purple-400">
                <span>Shipped:</span>
                <span>{stats.byStatus?.shipped || 0}</span>
             </div>
              <div className="flex justify-between items-center text-green-600">
                <span>Delivered:</span>
                <span>{stats.byStatus?.delivered || 0}</span>
             </div>
              <div className="flex justify-between items-center text-red-600">
                <span>Cancelled:</span>
                <span>{stats.byStatus?.cancelled || 0}</span>
             </div>
           </div>
        </div>

        {/* Total Users Card */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col">
           <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-white">Total Users</div>
            <FaUsers className="text-green-400 text-2xl" />
          </div>
          <div className="text-3xl font-bold text-blue-400">{stats.users || 0}</div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col">
           <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-white">Total Revenue</div>
            <span className="text-green-400 text-2xl">₹</span>
          </div>
          <div className="text-3xl font-bold text-green-400">₹{stats.revenue?.toFixed(2) || '0.00'}</div>
        </div>

        {/* Payment Status Card */}
        <div className="bg-gray-800 rounded-xl p-6 flex flex-col">
           <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-semibold text-white">Payment Status</div>
            <FaLock className="text-yellow-400 text-2xl" />
          </div>
           {stats.paymentStatus && (
              <div className="text-sm space-y-1">
                   <div className="flex justify-between items-center text-green-400">
                       <span>Fully Paid:</span>
                       <span>{stats.paymentStatus.fullyPaid || 0}</span>
                   </div>
                    <div className="flex justify-between items-center text-yellow-400">
                       <span>Partially Paid:</span>
                       <span>{stats.paymentStatus.partiallyPaid || 0}</span>
                    </div>
                     <div className="flex justify-between items-center text-red-400">
                        <span>Pending Payment:</span>
                        <span>{stats.paymentStatus.pendingPayment || 0}</span>
                     </div>
               </div>
          )}
        </div>
      </div>

      {/* Orders/Users Tabs and Filters/Table */}
      <div className="bg-gray-800 rounded-xl p-6 max-w-7xl mx-auto">
         {/* Tabs */}
         <div className="flex mb-6 border-b border-gray-700">
             <button
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'orders' ? 'text-white border-b-2 border-green-500' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('orders')}
             >
               Orders
             </button>
         </div>

        {/* Filters and Sort */}
         <div className="flex items-center space-x-4 mb-6">
             {/* Filter by Status */}
             <select className="bg-gray-700 text-white text-sm rounded-md p-2">
                 <option value="">All Status</option>
                 {Object.keys(stats.byStatus || {}).map(statusOption => (
                     <option key={statusOption} value={statusOption}>{statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}</option>
                 ))}
             </select>
             {/* Sort by Date */}
             <select className="bg-gray-700 text-white text-sm rounded-md p-2">
                 <option value="">Sort by Date</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
             </select>
             <button className="btn btn-sm btn-outline">Apply</button>
         </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          {activeTab === 'orders' && (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-8">No orders found.</td></tr>
                ) : (
                  orders.map(order => {
                    console.log('Rendering order with status:', order.status);
                    return (
                    <tr key={order._id} className="border-b border-gray-700">
                      <td className="py-3 px-4 font-mono">#{order._id.slice(-6)}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold">{order.user?.name}</div>
                        <div className="text-xs text-gray-400">{order.user?.email}</div>
                      </td>
                      {/* Displaying formatted date */}
                      <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                      {/* Status badge with onClick to open modal */}
                      <td className="py-3 px-4">
                          <button className="focus:outline-none" onClick={() => openStatusModal(order)}>
                               {badge(order.status || 'Unknown', order.status)}
                          </button>
                      </td>
                       <td className="py-3 px-4">
                           {/* Displaying both payment statuses in a single badge */}
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
                      {/* Items List */}
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-2">
                          {order.orderItems?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                              <div>
                                <div className="font-semibold text-sm">{item.name}</div>
                                <div className="text-xs text-gray-400">Qty: {item.quantity}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                         <Link
                          to={`/admin/order/${order._id}`}
                           className="btn btn-sm btn-outline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                    );
                })
              )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {isModalOpen && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Order Status</h3>
            <div className="mb-4 text-gray-300">Current status: <span className="font-semibold">{currentOrder.status}</span></div>
            <div className="grid grid-cols-2 gap-4">
              {/* Modal buttons */}
              {['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(statusOption => (
                <button
                  key={statusOption}
                  className={`btn ${isStatusDisabled(currentOrder, statusOption) ? 'btn-disabled' : 'btn-secondary'}`}
                  onClick={() => handleStatusChange(currentOrder._id, statusOption)}
                  disabled={isStatusDisabled(currentOrder, statusOption) || actionLoading === currentOrder._id + statusOption}
                >
                  {actionLoading === currentOrder._id + statusOption ? <FaSpinner className="animate-spin" /> : statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                </button>
              ))}
            </div>
            <div className="mt-6">
              <button
                className="btn btn-outline w-full"
                onClick={closeStatusModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 