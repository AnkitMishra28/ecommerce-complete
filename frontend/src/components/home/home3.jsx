import React from 'react';
import EcommerceCard from '../elements/card';
import { products } from '../../data/product';

export default function Home3() {
  // Flattened product list
  const allItems = products.map((item, idx) => ({
    ...item,
    key: `${item.id}-${idx}`,
  }));

  // Display first 10
  const displayItems = allItems.slice(0, 10);

  return (
    <div className="relative h-auto bg-gray-800 p-4" id='first'>
      <div className="flex snap-x snap-mandatory overflow-x-auto pb-5 space-x-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-x-hidden lg:space-x-0 scroll-smooth lg:h-[900px]">
        {displayItems.map(item => (
          <div key={item.key} className="flex-shrink-0 w-[280px] snap-start lg:w-auto">
            <EcommerceCard product={item} />
          </div>
        ))}
      </div>
    </div>
  );
}