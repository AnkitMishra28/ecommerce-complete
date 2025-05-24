import React, { useEffect, useRef } from 'react';

const Carousel = () => {
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

  return (
    <div className="relative w-full overflow-hidden">
      {/* Outer wrapper hides scrollbar overflow */}
      <div className="overflow-x-auto scrolling-touch scrollbar-hide" ref={carouselRef} style={{ scrollBehavior: 'smooth' }}>
        <div className="flex space-x-6 px-4 py-4">
          {[
            "photo-1559703248-dcaaec9fab78",
            "photo-1565098772267-60af42b81ef2",
            "photo-1572635148818-ef6fd45eb394",
            "photo-1494253109108-2e30c049369b",
            "photo-1550258987-190a2d41a8ba",
            "photo-1559181567-c3190ca9959b",
            "photo-1601004890684-d8cbf643f5f2",
          ].map((img, i) => (
            <div key={i} className="min-w-[300px] flex-shrink-0 rounded-lg shadow-lg overflow-hidden">
              <img
                src={`https://img.daisyui.com/images/stock/${img}.webp`}
                alt={`carousel-${i}`}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Hide scrollbar with CSS */}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Carousel;
