import React, { useEffect, useState } from 'react';
import EcommerceCard from '../elements/card';
// import { products } from '../../data/bread'; // Remove static import
import axios from '../../utils/axios'; // Import axios
import toast from 'react-hot-toast';

export default function Home3() {
  const [products, setProducts] = useState([]); // State to store fetched products
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch products from backend API
        const { data } = await axios.get('/api/products');
        // Filter products by category if needed, or fetch specific categories from backend
        // For now, assuming /api/products returns all products and we'll filter
        const breadProducts = data.products.filter(product => product.category === 'Bread');
        setProducts(breadProducts); // Store fetched products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products'); // Set error state
        setLoading(false);
        toast.error('Failed to load products');
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return <div className="text-white text-center py-8">Loading Breads...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-gray-400 text-center py-8">No bread products found.</div>;
  }

  // Flattened product list (using fetched products)
  const allItems = products.map((item, idx) => ({
    ...item,
    key: `${item._id}-${idx}`, // Use MongoDB _id for key
  }));

  // Display first 10 or fewer if less than 10 products
  const displayItems = allItems.slice(0, Math.min(allItems.length, 10));

  return (
    <div className="relative h-auto bg-gray-800 p-4" id='bread'>
      <div className='relative flex flex-col justify-center items-center p-2 md:p-8'>
        <p className='text-5xl md:text-7xl text-[#cdb2b2] unbounded'>Crunchy & Soft Breads</p>
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