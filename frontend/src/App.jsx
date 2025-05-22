import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import Navbar from './components/navbar.jsx';
import Footer from './components/footer.jsx';
import Bg from './components/bg.jsx';

function App() {
  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Background Layer */}
      <Bg />

      {/* Navigation Bar */}
      <header className="relative z-20">
        <Navbar />
      </header>

      {/* Routed Pages */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </main>
      <footer className="relative z-20">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
