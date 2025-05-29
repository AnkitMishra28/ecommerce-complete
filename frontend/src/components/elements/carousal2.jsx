import React, { useRef, useEffect } from 'react';

const Carousal2 = () => {
    const CarousalImages = [
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmFrZXJ5fGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1714662390433-443073660a26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1509474520651-53cf6a80536f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FrZXN8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1626803775151-61d756612f97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGNha2VzfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNha2VzfGVufDB8fDB8fHww"
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
        <div className="w-screen overflow-hidden p-2 border-0 border-amber-300">
            <div
                ref={carouselRef}
                className="flex overflow-x-auto space-x-1 scrollbar-hide p-4"
            >
                {CarousalImages.map((img, i) => (
                    <div
                        key={i}
                        className="group h-100 flex-shrink-0 rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105 hover:-translate-y-1"
                        style={{ width: 'auto' }}
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