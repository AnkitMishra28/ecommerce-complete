import React from 'react';

const Cardtrans = () => {
    const carousalItems = [
        {
            id: 1,
            name: "EcoSmart Backpack",
            description: "Durable and lightweight backpack for everyday use.",
            url: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" // kept same
        },
        {
            id: 2,
            name: "Zen Wooden Lamp",
            description: "Handcrafted lamp for cozy and peaceful interiors.",
            url: "https://images.unsplash.com/photo-1602524205210-0fc8f9e7d4a3"
        },
        {
            id: 3,
            name: "Urban Sneakers",
            description: "Breathable mesh sneakers perfect for city life.",
            url: "https://images.unsplash.com/photo-1585386959984-a41552262e4b"
        },
        {
            id: 4,
            name: "Studio Headphones X200",
            description: "Crisp sound quality for music lovers and creators.",
            url: "https://images.unsplash.com/photo-1580894732444-1cfc70bf1b5c"
        },
        {
            id: 5,
            name: "Minimalist Desk Setup",
            description: "Clean and productive workspace for modern work.",
            url: "https://images.unsplash.com/photo-1616627982217-d729b83aef4b"
        }
    ];

    const current = carousalItems[0]; // displaying first product

    return (
        <div className="flex justify-center items-center">
            <div className="card bg-base-100 w-96 shadow-lg">
                <figure>
                    <img
                        src={current.url}
                        alt={current.name}
                        className="w-full h-60 object-cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {current.name}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>{current.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div>
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cardtrans;
