import React, { useState } from 'react';
import Carousal from '../elements/carousal';
import Carousal2 from '../elements/carousal2';

const categories = {
  Men: ['Shirts', 'Jeans', 'Shoes', 'T-Shirts', 'Watches', 'Sunglasses'],
  Women: ['Dresses', 'Heels', 'Tops', 'Makeup', 'Jewelry', 'Handbags'],
  Kids: ['Toys', 'Clothes', 'Books', 'Shoes', 'Games', 'School Bags'],
  Electronics: ['Mobiles', 'Laptops', 'Headphones', 'Smartwatches', 'Monitors', 'Cameras'],
  Bathroom: ['Shower Gels', 'Towels', 'Toiletries', 'Bath Mats', 'Mirrors', 'Racks'],
  Accessories: ['Watches', 'Bags', 'Jewelry', 'Caps', 'Belts', 'Scarves'],
  Laptop: ['Gaming Laptops', 'Business Laptops', 'Student Laptops', 'Laptop Bags', 'Cooling Pads'],
  Others: ['Furniture', 'Books', 'Decor', 'Plants', 'Lighting', 'Cleaning'],
  Footwear: ['Sneakers', 'Sandals', 'Loafers', 'Boots', 'Flip Flops', 'Formal Shoes'],
  Sports: ['Fitness Bands', 'Dumbbells', 'Treadmills', 'Gym Wear', 'Sports Shoes', 'Yoga Mats'],
  Kitchen: ['Cookware', 'Appliances', 'Storage', 'Cutlery', 'Water Bottles', 'Lunch Boxes'],
  Beauty: ['Skincare', 'Haircare', 'Fragrances', 'Cosmetics', 'Nail Polish', 'Face Masks'],
  Stationery: ['Notebooks', 'Pens', 'Folders', 'Files', 'Art Supplies', 'Calculators'],
  Travel: ['Luggage', 'Trolleys', 'Backpacks', 'Neck Pillows', 'Travel Bottles', 'Adapters']
};

const Home1 = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className=" relative">
      <div className="relative z-10 pt-6">
        <Carousal2 />

        <div className="text-center mt-10 p-4">
          <h1 className="text-5xl md:text-7xl unbounded font-bold text-gray-200">Shop like celebs</h1>
          <p className="text-lg md:text-2xl mt-2 text-gray-400">"Why wait? Buy your look now."</p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center mt-8 gap-3 px-4">
          {Object.keys(categories).map((cat) => (
            <div className="dropdown" key={cat}>
              <label tabIndex={0} className="btn btn-sm bg-gray-700 text-[14px] text-white font-semibold rounded-full px-4 py-2">
                {cat}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
              >
                {categories[cat].map((sub, idx) => (
                  <li key={idx}><a>{sub}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Carousal />
        </div>
      </div>
    </div>
  );
};

export default Home1;
