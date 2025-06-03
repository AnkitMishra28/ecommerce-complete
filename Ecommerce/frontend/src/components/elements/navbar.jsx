import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Debug logs
  console.log('Navbar Render:', {
    isAuthenticated,
    hasUser: !!user,
    userData: user,
    localStorage: localStorage.getItem('userInfo')
  });

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('userInfo');
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/images/logo.png"
                alt="Bakery Shop"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                {/* Links for authenticated users (Admin or Regular) */}
                {isAuthenticated ? (
                  user?.role === 'admin' ? (
                    <Link
                      to="/admin/dashboard"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    {/* Regular user links */}
                    <>
                      <Link
                        to="/products"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Products
                      </Link>
                      <Link
                        to="/cart"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                      >
                        <FaShoppingCart className="h-5 w-5" />
                        {items.length > 0 && (
                          <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {items.length}
                          </span>
                        )}
                      </Link>
                      {/* My Orders link - only show for non-admins */}
                      {user?.role !== 'admin' && (
                        <Link
                          to="/my-orders"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                          My Orders
                        </Link>
                      )}
                    </>
                  )
                ) : null} {/* Links for non-authenticated users handled in the right section */}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Auth/User links for desktop - Right section */}
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">
                    Welcome, {user.name || user.email}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/signin"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaSignInAlt className="mr-2" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-amber-600 text-white hover:bg-amber-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <FaUserPlus className="mr-2" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          {/* Links for authenticated users (Admin or Regular) - mobile */}
          {isAuthenticated ? (
            user?.role === 'admin' ? (
              <Link
                to="/admin/dashboard"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Admin Dashboard
              </Link>
            ) : (
              {/* Regular user links - mobile */}
              <>
                <Link
                  to="/products"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Products
                </Link>
                <Link
                  to="/cart"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
                >
                  <FaShoppingCart className="h-5 w-5" />
                  {items.length > 0 && (
                    <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {items.length}
                    </span>
                  )}
                </Link>
                {/* My Orders link - mobile - only show for non-admins */}
                {user?.role !== 'admin' && (
                  <Link
                    to="/my-orders"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    My Orders
                  </Link>
                )}
              </>
            )
          ) : null} {/* Links for non-authenticated users handled below - mobile */}
        </div>
        {/* Auth/User links for mobile - Bottom section */}
        <div className="pt-4 pb-3 border-t border-gray-700">
          {isAuthenticated && user ? (
            <div className="flex flex-col px-5 space-y-3">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.name || user.email}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="mt-3 px-2 space-y-1">
              <Link
                to="/signin"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaSignInAlt className="mr-2" />
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 