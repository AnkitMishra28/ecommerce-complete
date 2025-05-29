import React from 'react';
import Home1 from '../components/home/home1.jsx';
import Home2 from '../components/home/home2.jsx';
import Home3 from '../components/home/home3.jsx';

const Homepage = ({ setproductid }) => (
  <div className='h-full'>
    <div className='h-auto'><Home1 /></div>
    <div className='h-auto ' id="home3"><Home2 /></div>
    <div className='h-auto'><Home3 setproductid={setproductid} /></div>
  </div>
);

export default Homepage;