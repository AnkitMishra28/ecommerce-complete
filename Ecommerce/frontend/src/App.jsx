import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import Homepage from './pages/homepage.jsx';
import Navbar from './components/navbar.jsx';
import Register from './components/elements/register.jsx';
import Signin from './components/elements/signin.jsx';
import Cart from './pages/cart.jsx';
import Footer from './components/footer.jsx';
import Bg from './components/bg.jsx';
import { useSelector } from 'react-redux';
import MyOrders from './pages/myOrders';
import OrderDetails from './pages/orderDetails';
import AdminDashboard from './pages/adminDashboard';
// import { products } from './data/product.js';

// Route protection components
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/signin" />;
  if (user?.role === 'admin') return <Navigate to="/admin/dashboard" />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/signin" />;
  if (!(isAuthenticated && user?.role === 'admin')) return <Navigate to="/" />;
  return children;
};

function App() {
  const location = useLocation();
  const hideLayout = ['/signin', '/register'].includes(location.pathname);

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      <Bg />
      <Toaster position="top-center" reverseOrder={false} />

      {!hideLayout && (
        <header className="fixed top-0 z-20 w-full">
          <Navbar />
        </header>
      )}

      <main className={`flex-grow ${!hideLayout ? 'pt-[64px]' : ''} relative z-10`}>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
          <Route path="/admin/order/:id" element={<AdminRoute><OrderDetails/></AdminRoute>} />
        </Routes>
      </main>

      {!hideLayout && (
        <footer className="relative z-10">
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default App;
