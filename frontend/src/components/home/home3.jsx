import React from 'react';
import Card from '../elements/card.jsx';

const Home3 = () => {
    return (
        <div className="relative h-auto border-0 border-black bg-[#e0e0e0] p-4">
            {/* For mobile: horizontal scroll; for large screens: grid */}
            <div className="flex overflow-x-auto space-x-4 lg:grid lg:grid-cols-4 lg:space-x-0 lg:gap-4 lg:overflow-x-hidden scroll-smooth">
                {[...Array(8)].map((_, index) => (
                    <div key={index} className="flex-shrink-0 w-[80%] sm:w-[60%] md:w-[40%] lg:w-auto">
                        <Card />
                    </div>
                ))}
            </div>
            <div className="relative top-5">
                <h1 className="text-center text-6xl lg:text-[100px] py-6 lg:py-9 unbounded text-amber-900">
                    Why Waiting for the Best?
                </h1>
                <h1 className="text-center text-4xl lg:text-[40px] py-6 lg:py-9 playwrite-dk-loopet text-amber-900">
                    Explore the Best Products and buy them at the best price ...
                </h1>
            </div>

        </div>
    );
};

export default Home3;
