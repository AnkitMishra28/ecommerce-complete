import React, { useEffect, useRef } from 'react';

const Carousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = carouselRef.current;

        // If near the end, reset to start
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 2500); // Scroll every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden">
      <div
        ref={carouselRef}
        className="carousel carousel-center space-x-4 p-4 flex overflow-x-auto scroll-smooth no-scrollbar"
      >
        {[
          "photo-1559703248-dcaaec9fab78",
          "photo-1565098772267-60af42b81ef2",
          "photo-1572635148818-ef6fd45eb394",
          "photo-1494253109108-2e30c049369b",
          "photo-1550258987-190a2d41a8ba",
          "photo-1559181567-c3190ca9959b",
          "photo-1601004890684-d8cbf643f5f2",
        ].map((img, i) => (
          <div key={i} className="carousel-item min-w-[300px] flex-shrink-0">
            <img
              src={`https://img.daisyui.com/images/stock/${img}.webp`}
              className="rounded-box w-full"
              alt={`carousel-${i}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
