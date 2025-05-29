import React from 'react';
import { products } from '../../data/product.js'; // Assuming you have a products data file

const Cardtrans = ({
    imageUrl,
    title,
    price,
    description,
    onAddToCart,
    sale,
}) => {
    return (
        <div className="flex justify-center items-center">
            <div className="card bg-base-100 w-96 shadow-lg">
                <figure>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-60 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cardtrans;