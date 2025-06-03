import React, { useEffect, useState } from 'react';
import EcommerceCard from '../elements/card';
// import { products } from '../../data/drinks'; // Remove static import
import axios from '../../utils/axios'; // Import axios
import toast from 'react-hot-toast';

export default function Home6() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        // Filter products by category 'Beverages'
        const drinkProducts = data.products.filter(product => product.category === 'Beverages');
        setProducts(drinkProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching drinks:', error);
        setError('Failed to load drinks');
        setLoading(false);
        toast.error('Failed to load drinks');
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-white text-center py-8">Loading Beverages...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-gray-400 text-center py-8">No beverage products found.</div>;
  }

  const allItems = products.map((item, idx) => ({
    ...item,
    key: `${item._id}-${idx}`,
  }));

  const displayItems = allItems.slice(0, Math.min(allItems.length, 10));

  return (
    <div className="relative h-auto bg-gray-800 p-4" id='drink'>
      <div className='relative flex flex-col justify-center items-center p-2 md:p-8'>
        <p className='text-5xl md:text-7xl text-[#b5aeaf] unbounded'>Tasty Drinks & Beverages</p>
      </div>
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