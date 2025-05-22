import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="product-card mt-5">
        <div className="product-image-container">
          {/* You can replace the placeholder image with your product image */}
          <img
            src="https://m.media-amazon.com/images/I/41FYkVPzrIL.jpg"
            alt="Product"
            className="product-image"
          />
        </div>
        <p className="product-title text-white">i-Pad(64gb 128Mib)</p>
        <p className="product-description font-semibold text-white">
          This is a short description of the product. Highlight key features.
        </p>
        <div className="product-footer">
          <p className="product-price text-red-900">$49.99</p>
          <button className="add-to-cart-btn hover:bg-blue-700 text-amber-100">Add to Cart</button>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .product-card {
    display: flex;
    flex-direction: column;
    width: 300px;
    background-color: #90D1CA;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    padding: 16px;
    transition: transform 0.3s ease;
    cursor: pointer;
  }

  .product-card:hover {
    transform: translateY(-8px);
  }

  .product-image-container {
    width: 100%;
    height: 200px;
    background-color: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-title {
    font-size: 18px;
    font-weight: 600;
    margin: 12px 0 6px;
  }

  .product-description {
    font-size: 14px;
    margin-bottom: 16px;
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-price {
    font-size: 16px;
    font-weight: bold;
  }

  .add-to-cart-btn {
    padding: 8px 12px;
    background-color: #12bde7;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0a8bbd;
    }
  }
`;


export default Card;
