import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('home');
  const [mobileMenu, setMobileMenu] = useState(false);
  const { getTotalCartItems, token, logout } = useContext(StoreContext);
  const navigate = useNavigate();

  const cartItemsCount = getTotalCartItems();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenu('home');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={() => setMenu('home')} className="flex items-center space-x-2">
            <MdRestaurantMenu className="text-3xl text-primary" />
            <span className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FoodExpress
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 items-center">
            <li>
              <Link
                to="/"
                onClick={() => setMenu('home')}
                className={`font-medium transition-colors ${
                  menu === 'home' ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <a
                href="#explore-menu"
                onClick={() => setMenu('menu')}
                className={`font-medium transition-colors ${
                  menu === 'menu' ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Menu
              </a>
            </li>
            <li>
              <a
                href="#footer"
                onClick={() => setMenu('contact')}
                className={`font-medium transition-colors ${
                  menu === 'contact' ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-700 hover:text-primary'
                }`}
              >
                Contact
              </a>
            </li>
          </ul>

          {/* Right Side - Cart & Profile */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700 hover:text-primary transition-colors cursor-pointer" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center pulse-badge">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-full font-medium transition-all btn-ripple"
              >
                Sign In
              </button>
            ) : (
              <div className="relative group">
                <FaUser className="text-2xl text-gray-700 hover:text-primary transition-colors cursor-pointer" />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Orders
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-2xl text-gray-700"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="md:hidden pb-4 animate-slide-up">
            <Link
              to="/"
              onClick={() => {
                setMenu('home');
                setMobileMenu(false);
              }}
              className={`block py-2 ${
                menu === 'home' ? 'text-primary font-semibold' : 'text-gray-700'
              }`}
            >
              Home
            </Link>
            <a
              href="#explore-menu"
              onClick={() => {
                setMenu('menu');
                setMobileMenu(false);
              }}
              className={`block py-2 ${
                menu === 'menu' ? 'text-primary font-semibold' : 'text-gray-700'
              }`}
            >
              Menu
            </a>
            <a
              href="#footer"
              onClick={() => {
                setMenu('contact');
                setMobileMenu(false);
              }}
              className={`block py-2 ${
                menu === 'contact' ? 'text-primary font-semibold' : 'text-gray-700'
              }`}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
