import React from 'react';
import Card from '../elements/card.jsx';

const Home3 = () => {
    return (
        <div className="relative h-auto bg-gray-800 border-0 p-4 border-amber-50">
            <div className="flex snap-x snap-mandatory overflow-x-auto pb-5 space-x-4 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-x-hidden lg:space-x-0 scroll-smooth lg:h-[900px] border-0 border-amber-300">
                {[...Array(10)].map((_, index) => (
                    <div 
                        key={index} 
                        className="flex-shrink-0 w-[280px] snap-start lg:w-auto"
                    >
                        <Card 
                            sale={index < 4} // Sale label on first 4 cards
                            imageUrl={`https://picsum.photos/200/300?random=${index}`}
                            title={`Premium Product ${index + 1}`}
                            price={`$${(Math.random() * 100 + 50).toFixed(2)}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home3;