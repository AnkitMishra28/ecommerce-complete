import React from 'react'
import Home1 from '../components/home/home1.jsx'
import Home2 from '../components/home/home2.jsx'    
import Home3 from '../components/home/home3.jsx'    

const homepage = () => {
  return (
    <div className='h-full'>
        <div className='h-auto'>
            <Home1 />
        </div>
        <div className='h-auto'>
            <Home2 />
        </div>
        <div className='h-auto'>
            <Home3 />
        </div>
    </div>
    
  )
}

export default homepage