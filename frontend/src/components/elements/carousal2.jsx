import React, { useRef, useEffect } from 'react';

const Carousal2 = () => {
    const CarousalImages = [
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        "https://picsum.photos/id/237/400/300", // Random width image,
        "https://picsum.photos/id/1002/800/300", // Wide image
        "https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp",
        "https://picsum.photos/id/1015/500/300", // Medium width
    ];

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
        }, 3500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" w-screen overflow-hidden p-2 border-0 border-amber-300">
            <div
                ref={carouselRef}
                className="flex overflow-x-auto space-x-1 scrollbar-hide p-4"
            >
                {CarousalImages.map((img, i) => (
                    <div
                        key={i}
                        className="h-100 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
                        style={{ width: 'auto' }} // Let image define its width
                    >
                        <img
                            src={img}
                            alt={`carousel-${i}`}
                            className="h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousal2;
