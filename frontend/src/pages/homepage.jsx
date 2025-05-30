import React from 'react';
import Home1 from '../components/home/home1.jsx';
import Home2 from '../components/home/home2.jsx';
import Home3 from '../components/home/home3.jsx';
import Home4 from '../components/home/home4.jsx';
import Home5 from '../components/home/home5.jsx';
import Home6 from '../components/home/home6.jsx';

const Homepage = ({ setproductid }) => (
  <div className='h-full'>
    <div className='h-auto'><Home1 /></div>
    <div className='h-auto'><Home2 /></div>
    <div className='h-auto'><Home3/></div>
    <div className='h-auto'><Home4/></div>
    <div className='h-auto'><Home5/></div>
    <div className='h-auto'><Home6/></div>
  </div>
);

export default Homepage;