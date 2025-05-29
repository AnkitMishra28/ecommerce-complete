import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { useState } from 'react';
import Homepage from './pages/homepage.jsx';
import Navbar from './components/navbar.jsx';
import Register from './components/elements/register.jsx';
import Signin from './components/elements/signin.jsx';
import Cart from './pages/cart.jsx';
import Footer from './components/footer.jsx';
import Bg from './components/bg.jsx';
// import { products } from './data/product.js';

function App() {
  const location = useLocation();
  const hideLayout = ['/signin', '/register'].includes(location.pathname);

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      <Bg />
      <Toaster position="top-center" reverseOrder={false} />

      {!hideLayout && (
        <header className="fixed top-0 z-20 w-full">
          <Navbar />
        </header>
      )}

      <main className={`flex-grow ${!hideLayout ? 'pt-[64px]' : ''} relative z-10`}>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </main>

      {!hideLayout && (
        <footer className="relative z-10">
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default App;
