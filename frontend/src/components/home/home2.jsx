import React, { useRef, useEffect } from 'react';
import Cardtrans from '../elements/cardtrans.jsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Imgstk from '../../components/elements/imagestk.jsx';

const Home2 = () => {
  const carouselRef = useRef(null);

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

  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-full bg-[#90D1CA] overflow-hidden">
      {/* Responsive Heading */}
      <div className="text-center py-4 px-4">
        <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-[190px] unbounded text-amber-50 leading-tight">
          Buying Something Trendy ...
        </h1>
      </div>

      {/* Carousel */}
      <div className="overflow-hidden w-full px-2 sm:px-4 lg:px-8">
        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto scroll-smooth no-scrollbar py-6"
        >
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] lg:min-w-[320px] flex-shrink-0"
            >
              <Cardtrans />
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Imgstk Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <Imgstk />
      </div>
    </div>
  );
};

export default Home2;
