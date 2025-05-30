import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'; // Cart icon

const EcommerceCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddToCart = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  const onBuyNow = () => {
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
    navigate('/cart');
  };

  return (
    <div className="card card-compact bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover h-54 w-full"
        />
        {product.sale && (
          <div className="badge badge-error absolute top-3 right-3 text-xs font-bold">
            SALE
          </div>
        )}
      </figure>

      <div className="card-body flex flex-col">
        <h2 className="card-title text-lg font-semibold line-clamp-2">
          {product.name}
        </h2>
        <h4 className="">
          {product.description}
        </h4>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-bold text-primary">₹{product.price}</span>
          {product.sale && (
            <span className="text-sm text-gray-400 line-through">₹1499.00</span>
          )}
        </div>

        {/* Buttons side by side */}
        <div className="mt-auto flex gap-2">
          <button
            onClick={onBuyNow}
            className="btn btn-primary btn-sm uppercase tracking-wide flex-1"
          >
            Buy Now
          </button>

          <button
            onClick={onAddToCart}
            className="btn btn-success btn-sm flex justify-center items-center p-2"
            aria-label="Add to Cart"
          >
            <FaShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcommerceCard;
