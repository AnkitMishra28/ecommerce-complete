import { Route, Routes, useLocation } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import Navbar from './components/navbar.jsx';
import Register from './components/elements/register.jsx';
import Signin from './components/elements/signin.jsx';
import Footer from './components/footer.jsx';
import Bg from './components/bg.jsx';

function App() {
  const location = useLocation();
  const hideLayout = location.pathname === '/signin' || location.pathname === '/register';

  return (
    <div className="relative flex flex-col min-h-screen bg-black overflow-x-hidden">
      {/* Background Layer */}
      <Bg />

      {/* Navigation Bar */}
      {!hideLayout && (
        <header className="fixed top-0 z-20 w-full">
          <Navbar />
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-grow ${!hideLayout ? 'pt-[64px]' : ''} relative z-10`}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </main>

      {/* Footer */}
      {!hideLayout && (
        <footer className="relative z-10">
          <Footer />
        </footer>
      )}
    </div>
  );
}

export default App;
