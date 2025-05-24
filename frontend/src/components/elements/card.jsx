import React from 'react';

export const EcommerceCard = ({
  imageUrl = 'https://picsum.photos/280/320',
  title = 'Product Name',
  price = '$99.99',
  onAddToCart = () => {},
  sale = false
}) => {
  return (
    <div className="card card-compact bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-0 border-amber-50">
      <figure className="relative">
        <img src={imageUrl} alt={title} className="object-cover h-54 w-full" />
        {sale && (
          <div className="badge badge-error absolute top-3 right-3 text-xs font-bold">
            SALE
          </div>
        )}
      </figure>
      <div className="card-body flex flex-col">
        <h2 className="card-title text-lg font-semibold line-clamp-2">{title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-bold text-primary">{price}</span>
          {sale && <span className="text-sm text-gray-400 line-through">$149.99</span>}
        </div>
        <button
          onClick={onAddToCart}
          className="btn btn-primary btn-sm mt-auto uppercase tracking-wide"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Example grid
export const ExampleCardList = () => (
  <div className="bg-base-200 p-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {Array.from({ length: 10 }).map((_, idx) => (
        <EcommerceCard
          key={idx}
          imageUrl={`https://picsum.photos/280/320?random=${idx}`}
          title={`Modern Product ${idx + 1}`}
          price={`$${(Math.random() * 100 + 50).toFixed(2)}`}
          sale={idx < 5}
        />
      ))}
    </div>
  </div>
);

export default EcommerceCard;
