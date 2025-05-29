import React, { useRef, useEffect } from 'react';
import Cardtrans from '../elements/cardtrans.jsx';
import Imgstk from '../../components/elements/imagestk.jsx';
import Head from '../../../public/images/head.webp';
import Balls from '../elements/animated.1.jsx';
import Countdown from '../elements/countdown.jsx';
import { products } from '../../data/product.js';

export default function Home2() {
  const carouselRef = useRef(null);

  // Flatten and select items for the carousel
  const allItems = products.map((item,idx) => ({
    key: item.id,             // unique React key
    category: item.category,  // if you ever need it
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
  }));
  const carouselItems = allItems.slice(0, 7);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Manual scroll
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-full bg-gray-800 overflow-hidden">
      {/* Sticky Header */}
      <div className="sticky top-0 h-[700px] bg-gray-800">
        <img
          src='https://png.pngtree.com/png-clipart/20230425/original/pngtree-real-shot-of-white-cream-chocolate-party-cake-png-image_9100333.png'
          alt="image_of_headphone"
          className="absolute top-40 left-1/2 transform -translate-x-1/2 z-20 h-[400px] object-contain"
        />
        <div className="flex justify-center items-center h-full z-10 relative" style={{ textShadow: '2px 2px 10px rgba(0,0,0,0.6)' }}>
          <h1 className="text-[200px] sm:text-7xl md:text-7xl lg:text-[190px] font-bold unbounded text-gray-500 text-center">
            Buying Something Tasty ...
          </h1>
        </div>
        <div className="flex justify-center items-center h-full z-10 absolute -top-2 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <Balls />
        </div>
      </div>

      {/* Image stack section */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-4">
        <Imgstk />
      </div>

      {/* Title section */}
      <div className="flex flex-col items-center space-y-2 md:space-y-4">
        <p className="text-2xl md:text-4xl font-extralight text-gray-400 pt-3 md:pt-0">
          Looking for Offers ?
        </p>
        <h1 className="text-4xl md:text-6xl p-3 md:p-2 font-bold unbounded text-gray-300">
          #Offers On New Products
        </h1>
      </div>

      {/* Carousel section */}
      <div className="overflow-hidden w-full px-2 sm:px-4 lg:px-0 pb-8">
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth py-6 scrollbar-hide"
        >
          {carouselItems.map((item, index) => (
            // console.log(item), // Debugging log to check items
            <div key={`${item.id}-${index}`} className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0">
              <Cardtrans
                imageUrl={item.image}
                title={item.name}
                price={item.price}
                description={item.description}
                sale={item.sale}
                onAddToCart={() => console.log(`Added ${item.name} to cart`)}
              />
            </div>
          ))}
        </div>

        {/* Countdown Component */}
        <Countdown />
      </div>
    </div>
  );
}
