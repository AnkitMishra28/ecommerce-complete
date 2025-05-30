import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalOriginalPrice = cartItems.reduce((total, item) => {
    const original = item.sale ? item.originalPrice || item.price + 200 : item.price;
    return total + original * item.quantity;
  }, 0);

  const discount = totalOriginalPrice - totalPrice;

  return (
    <div className="p-6 text-white min-h-screen bg-gray-900">
      <h2 className="text-3xl font-bold mb-6 mt-10" id='cart' >My Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-xl shadow-lg p-6 text-center">
          <svg
            className="w-24 h-24 mb-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.6 8M17 13l1.6 8M9 21h6"
            />
          </svg>
          <h3 className="text-2xl font-semibold text-white">Your cart is empty</h3>
          <p className="text-gray-400 mt-2">
            Looks like you haven’t added anything yet. Start shopping now!
          </p>
        </div>
      ) : (

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Cart Items */}
          <ul className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded mr-4"
                />
                <div className="flex-1 mt-2 md:mt-0">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.description || 'No description available.'}
                  </p>
                  <div className="text-gray-300 mt-2">
                    Price: ₹{item.price.toFixed(2)}
                    {item.sale && (
                      <span className="ml-2 text-sm text-red-400 line-through">
                        ₹{(item.originalPrice || item.price + 200).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {item.sale && (
                    <p className="text-red-400 text-sm mt-1">Special Offer: On Sale!</p>
                  )}

                  <div className="flex items-center mt-3 gap-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="btn btn-sm bg-green-700 hover:bg-green-600 text-white"
                      disabled={item.quantity === 1}
                    >
                      −
                    </button>
                    <span className="px-2 text-lg text-white">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="btn btn-sm bg-green-700 hover:bg-green-600 text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="mt-4 md:mt-0 md:ml-4 btn btn-error btn-sm"
                >
                  <FaTrash />
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Right Section - Summary with Per-Product Info */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-md h-fit">
            <h3 className="text-2xl font-bold mb-4">Order Summary</h3>

            <div className="space-y-4 text-sm text-gray-300 mb-4 h-auto overflow-y-auto pr-2">
              {cartItems.map((item, index) => {
                const originalPrice = item.sale
                  ? item.originalPrice || item.price + 200
                  : item.price;
                const itemDiscount = (originalPrice - item.price) * item.quantity;

                return (
                  <div key={index} className="border-b border-gray-700 pb-2">
                    <p className="font-semibold text-white">{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price.toFixed(2)}</p>
                    {item.sale && (
                      <>
                        <p className="text-red-400">
                          Discount: − ₹{itemDiscount.toFixed(2)}
                        </p>
                        <p className="text-gray-400 line-through">
                          Original: ₹{originalPrice.toFixed(2)} × {item.quantity}
                        </p>
                      </>
                    )}
                    <p className="text-white font-medium">
                      Subtotal: ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-gray-300 border-t border-gray-700 pt-4">
              <div className="flex justify-between">
                <span>Original Price:</span>
                <span>₹{totalOriginalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Discount:</span>
                <span>− ₹{discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg border-t border-gray-700 pt-2">
                <span>Total:</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button className="btn btn-success w-full mt-6 uppercase tracking-wide">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
