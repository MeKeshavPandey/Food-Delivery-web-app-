import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPopup from './components/LoginPopup';
import Home from './pages/Home';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Verify from './pages/Verify';
import MyOrders from './pages/MyOrders';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="min-h-screen flex flex-col">
        <Navbar setShowLogin={setShowLogin} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/orders" element={<MyOrders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
