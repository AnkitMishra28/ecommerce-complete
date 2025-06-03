const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/product.model');
const User = require('../models/user.model');
const Order = require('../models/order.model');
const Transaction = require('../models/transaction.model');

// Import product data from frontend
const breadProducts = [
  {
    name: 'Classic Loaf',
    description: 'Freshly baked classic white bread loaf',
    price: 199,
    image: 'https://plus.unsplash.com/premium_photo-1675788939155-f3c62a755d7e?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 50,
    rating: 4.5,
    numReviews: 12
  },
  {
    name: 'Multigrain Bread',
    description: 'Healthy multigrain bread with seeds',
    price: 249,
    image: 'https://images.unsplash.com/photo-1728670212431-ac192413f4b1?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 40,
    rating: 4.8,
    numReviews: 8
  },
  {
    name: 'Sourdough Bread',
    description: 'Tangy sourdough loaf with crunchy crust',
    price: 269,
    image: 'https://plus.unsplash.com/premium_photo-1675788939191-713c2abf3da6?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 35,
    rating: 4.7,
    numReviews: 15
  },
  {
    name: 'Rye Bread',
    description: 'Dense and flavorful rye bread with caraway seeds',
    price: 229,
    image: 'https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 30,
    rating: 4.6,
    numReviews: 10
  },
  {
    name: 'Garlic Bread Loaf',
    description: 'Soft loaf infused with garlic butter and herbs',
    price: 199,
    image: 'https://plus.unsplash.com/premium_photo-1673111979369-0222c7314b82?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 45,
    rating: 4.9,
    numReviews: 20
  },
  {
    name: 'French Baguette',
    description: 'Crispy golden French-style baguette',
    price: 189,
    image: 'https://images.unsplash.com/photo-1590301157172-7ba48dd1c2b2?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 55,
    rating: 4.7,
    numReviews: 18
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Nutritious bread made with 100% whole wheat flour',
    price: 219,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 40,
    rating: 4.5,
    numReviews: 14
  },
  {
    name: 'Ciabatta Bread',
    description: 'Italian white bread with open crumb and chewy texture',
    price: 259,
    image: 'https://images.unsplash.com/photo-1566698629409-787a68fc5724?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 35,
    rating: 4.8,
    numReviews: 16
  },
  {
    name: 'Focaccia',
    description: 'Flat oven-baked bread with rosemary and olive oil',
    price: 279,
    image: 'https://images.unsplash.com/photo-1613396874083-2d5fbe59ae79?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 30,
    rating: 4.9,
    numReviews: 22
  },
  {
    name: 'Brioche Bread',
    description: 'Soft and slightly sweet French bread with a buttery flavor',
    price: 299,
    image: 'https://images.unsplash.com/photo-1586765501019-cbe3973ef8fa?w=600&auto=format&fit=crop&q=60',
    brand: 'Bakery Fresh',
    category: 'Bread',
    countInStock: 25,
    rating: 4.7,
    numReviews: 19
  }
];

const cakeProducts = [
  {
    name: 'Chocolate Fudge Cake',
    description: 'Rich chocolate cake with fudge frosting',
    price: 799,
    image: 'https://images.unsplash.com/photo-1602351447937-745cb720612f?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 15,
    rating: 4.9,
    numReviews: 25
  },
  {
    name: 'Vanilla Cream Cake',
    description: 'Light vanilla sponge with cream frosting',
    price: 699,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 20,
    rating: 4.7,
    numReviews: 18
  },
  {
    name: 'Red Velvet Cake',
    description: 'Velvety red cake with cream cheese frosting',
    price: 749,
    image: 'https://images.unsplash.com/photo-1609357871098-7949aa2fb20d?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 12,
    rating: 4.8,
    numReviews: 30
  },
  {
    name: 'Black Forest Cake',
    description: 'Chocolate sponge layered with cream and cherries',
    price: 799,
    image: 'https://images.unsplash.com/photo-1618426703623-c1b335803e07?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 10,
    rating: 4.9,
    numReviews: 28
  },
  {
    name: 'Oreo Crunch Cake',
    description: 'Crunchy Oreo crust with creamy chocolate filling',
    price: 849,
    image: 'https://plus.unsplash.com/premium_photo-1716398897690-8ff3b2d3511f?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 8,
    rating: 4.8,
    numReviews: 22
  },
  {
    name: 'Strawberry Cream Cake',
    description: 'Soft sponge with fresh strawberry layers and cream',
    price: 699,
    image: 'https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 15,
    rating: 4.7,
    numReviews: 20
  },
  {
    name: 'Lemon Zest Cake',
    description: 'Tangy lemon sponge with creamy glaze',
    price: 649,
    image: 'https://plus.unsplash.com/premium_photo-1716540164265-4c78792c6f32?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 18,
    rating: 4.6,
    numReviews: 15
  },
  {
    name: 'Blueberry Delight Cake',
    description: 'Moist cake with blueberry compote and cream cheese',
    price: 749,
    image: 'https://images.unsplash.com/photo-1655411880489-2f0d18785863?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 12,
    rating: 4.8,
    numReviews: 24
  },
  {
    name: 'Mocha Mania Cake',
    description: 'Coffee and chocolate fusion cake with ganache',
    price: 799,
    image: 'https://images.unsplash.com/photo-1549572189-dddb1adf739b?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 10,
    rating: 4.9,
    numReviews: 26
  },
  {
    name: 'Rainbow Layer Cake',
    description: 'Colorful sponge layers with vanilla buttercream',
    price: 899,
    image: 'https://images.unsplash.com/photo-1618508369765-6099b7207c06?w=600&auto=format&fit=crop&q=60',
    brand: 'Sweet Delights',
    category: 'Cakes',
    countInStock: 8,
    rating: 4.7,
    numReviews: 19
  }
];

const pastryProducts = [
  {
    name: 'Chocolate Croissant',
    description: 'Flaky pastry with rich chocolate filling',
    price: 149,
    image: 'https://images.unsplash.com/photo-1605807646837-485a3bc9bf1b?w=600&auto=format&fit=crop&q=60',
    brand: 'Parisian Pastries',
    category: 'Pastry',
    countInStock: 40,
    rating: 4.8,
    numReviews: 35
  },
  {
    name: 'Fruit Tart',
    description: 'Buttery tart with fresh seasonal fruits',
    price: 299,
    image: 'https://images.unsplash.com/photo-1624633941860-a55d17f9fd18?w=600&auto=format&fit=crop&q=60',
    brand: 'Parisian Pastries',
    category: 'Pastry',
    countInStock: 25,
    rating: 4.7,
    numReviews: 28
  },
  {
    name: 'Chocolate Chip Cookies',
    description: 'Crunchy cookies loaded with chocolate chips',
    price: 199,
    image: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?w=600&auto=format&fit=crop&q=60',
    brand: 'Parisian Pastries',
    category: 'Cookies',
    countInStock: 60,
    rating: 4.9,
    numReviews: 45
  },
  {
    name: 'Oatmeal Raisin Cookies',
    description: 'Chewy oatmeal cookies with raisins',
    price: 179,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=60',
    brand: 'Parisian Pastries',
    category: 'Cookies',
    countInStock: 50,
    rating: 4.6,
    numReviews: 32
  },
  {
    name: 'Classic Cheesecake',
    description: 'Creamy cheesecake with buttery crust',
    price: 499,
    image: 'https://images.unsplash.com/photo-1708175313814-679cb8e90d2e?w=600&auto=format&fit=crop&q=60',
    brand: 'Parisian Pastries',
    category: 'Desserts',
    countInStock: 20,
    rating: 4.9,
    numReviews: 38
  },
  {
    name: 'French Macarons',
    description: 'Assorted flavored delicate macarons',
    price: 299,
    image: 'https://plus.unsplash.com/premium_photo-1714115035062-aca15e889c0e?w=600&auto=format&fit=crop&q=60',
    brand: 'Parisian Pastries',
    category: 'Desserts',
    countInStock: 35,
    rating: 4.8,
    numReviews: 42
  }
];

const drinkProducts = [
  {
    name: 'Iced Coffee',
    description: 'Chilled coffee with a smooth and bold flavor',
    price: 199,
    image: 'https://plus.unsplash.com/premium_photo-1721227932255-175db3ae7f88?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 100,
    rating: 4.7,
    numReviews: 55
  },
  {
    name: 'Hot Chocolate',
    description: 'Creamy and rich hot cocoa with marshmallows',
    price: 179,
    image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 80,
    rating: 4.8,
    numReviews: 48
  },
  {
    name: 'Fruit Punch',
    description: 'Refreshing mix of tropical fruit juices',
    price: 149,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 90,
    rating: 4.6,
    numReviews: 42
  },
  {
    name: 'Lemon Iced Tea',
    description: 'Cool and tangy lemon-flavored iced tea',
    price: 159,
    image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 85,
    rating: 4.7,
    numReviews: 38
  },
  {
    name: 'Mango Smoothie',
    description: 'Creamy mango smoothie with yogurt and ice',
    price: 219,
    image: 'https://plus.unsplash.com/premium_photo-1674228288173-519727295a6c?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 70,
    rating: 4.9,
    numReviews: 52
  },
  {
    name: 'Green Tea',
    description: 'Healthy and soothing hot green tea',
    price: 129,
    image: 'https://images.unsplash.com/photo-1517620430776-0ec904756579?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 95,
    rating: 4.5,
    numReviews: 45
  },
  {
    name: 'Mocha Frappe',
    description: 'Blended coffee with chocolate syrup and cream',
    price: 229,
    image: 'https://plus.unsplash.com/premium_photo-1663853293357-41695a0713a0?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 75,
    rating: 4.8,
    numReviews: 58
  },
  {
    name: 'Fresh Orange Juice',
    description: 'Cold-pressed juice from ripe oranges',
    price: 179,
    image: 'https://images.unsplash.com/photo-1481671703460-040cb8a2d909?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 65,
    rating: 4.7,
    numReviews: 49
  },
  {
    name: 'Cold Brew Coffee',
    description: 'Slow-steeped coffee served cold over ice',
    price: 199,
    image: 'https://images.unsplash.com/photo-1496318447583-f524534e9ce1?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 85,
    rating: 4.9,
    numReviews: 62
  },
  {
    name: 'Strawberry Milkshake',
    description: 'Sweet strawberry shake with whipped cream',
    price: 199,
    image: 'https://plus.unsplash.com/premium_photo-1663853491330-25a1620e4100?w=600&auto=format&fit=crop&q=60',
    brand: 'Brew & Co',
    category: 'Beverages',
    countInStock: 60,
    rating: 4.8,
    numReviews: 54
  }
];

// Combine all products
const products = [
  ...breadProducts,
  ...cakeProducts,
  ...pastryProducts,
  ...drinkProducts
];

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Create admin user
const adminUser = {
  name: 'Admin User',
  email: 'admin@gmail.com',
  password: 'admin@123',
  isAdmin: true
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Transaction.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    // Create admin user
    const admin = await User.create(adminUser);
    console.log('Admin user created');

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log('Products Imported!');

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 