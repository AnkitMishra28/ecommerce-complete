import React, { useState } from 'react';
import Carousal from '../elements/carousal';
import Carousal2 from '../elements/carousal2';

const categories = {
  Breads: ['White Bread', 'Whole Wheat Bread', 'Multigrain Bread', 'Baguette', 'Focaccia', 'Ciabatta'],
  Cakes: ['Chocolate Cake', 'Vanilla Cake', 'Red Velvet', 'Cheesecake', 'Fruit Cake', 'Cupcakes'],
  Pastries: ['Croissants', 'Danish Pastries', 'Eclairs', 'Turnovers', 'Tarts', 'Strudels'],
  Cookies: ['Chocolate Chip', 'Oatmeal Raisin', 'Sugar Cookies', 'Peanut Butter', 'Shortbread', 'Macarons'],
  Muffins: ['Blueberry Muffins', 'Bran Muffins', 'Chocolate Muffins', 'Banana Muffins', 'Corn Muffins', 'Pumpkin Muffins'],
  Savories: ['Sausage Rolls', 'Spinach Puffs', 'Cheese Straws', 'Quiches', 'Meat Pies', 'Empanadas'],
  Doughnuts: ['Glazed Doughnuts', 'Chocolate Doughnuts', 'Sprinkle Doughnuts', 'Filled Doughnuts', 'Old Fashioned', 'Cinnamon Sugar'],
  GlutenFree: ['Almond Flour Bread', 'Coconut Flour Muffins', 'Gluten-Free Cookies', 'Gluten-Free Cakes', 'Rice Flour Pastries', 'Gluten-Free Bagels'],
  Seasonal: ['Pumpkin Bread', 'Gingerbread Cookies', 'Eggnog Cake', 'Mince Pies', 'Holiday Fruit Cake', 'Yule Log'],
  BakingSupplies: ['Flour', 'Sugar', 'Yeast', 'Baking Powder', 'Chocolate Chips', 'Icing Sugar']
};

const Home1 = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="relative">
      <div className="relative z-10 pt-6">
        <Carousal2 />

        <div className="text-center mt-10 p-4">
          <h1 className="text-5xl md:text-7xl unbounded font-bold text-gray-200">Shop For Taste</h1>
          <p className="text-lg md:text-2xl mt-2 text-gray-400">"Why wait? Buy your taste."</p>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center mt-8 gap-2 px-4">
          {Object.keys(categories).map((cat) => (
            <div className="dropdown" key={cat}>
              <label
                tabIndex={0}
                className="btn btn-sm bg-gray-700 text-[17px] unbounded text-white font-semibold rounded-full px-4 py-2 cursor-pointer"
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              >
                {cat}
              </label>
              {activeCategory === cat && (
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2"
                >
                  {categories[cat].map((sub, idx) => (
                    <li key={idx}>
                      <a href="#">{sub}</a>
                    </li>
                  ))}
                </ul>
              )}
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
