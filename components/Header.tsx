
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartIcon from './icons/ShoppingCartIcon';
import UserIcon from './icons/UserIcon';
import MenuIcon from './icons/MenuIcon';
import CloseIcon from './icons/CloseIcon';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkClasses = "relative text-gray-300 hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full";
  const mobileNavLinkClasses = "text-3xl font-bold text-gray-300 hover:text-white transition-colors duration-300";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-2xl font-black tracking-wider text-white" onClick={closeMenu}>
                THREADS
              </NavLink>
            </div>
            <nav className="hidden md:flex md:space-x-8">
              <NavLink to="/" className={({ isActive }) => `${navLinkClasses} ${isActive ? 'text-white after:w-full' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/shop" className={({ isActive }) => `${navLinkClasses} ${isActive ? 'text-white after:w-full' : ''}`}>
                Shop
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `${navLinkClasses} ${isActive ? 'text-white after:w-full' : ''}`}>
                Contact
              </NavLink>
              {user?.role === 'admin' && (
                <NavLink to="/admin" className={({ isActive }) => `${navLinkClasses} ${isActive ? 'text-white after:w-full' : ''}`}>
                  Admin Panel
                </NavLink>
              )}
            </nav>
            <div className="flex items-center space-x-4">
              <button onClick={toggleCart} className="relative text-gray-300 hover:text-white transition-colors duration-300">
                <ShoppingCartIcon />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <div className="hidden sm:flex items-center space-x-4">
                {user ? (
                   <>
                    <Link to="/account" className="text-gray-300 hover:text-white transition-colors duration-300" title="My Account">
                        <UserIcon />
                    </Link>
                    <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-bold uppercase tracking-wider">
                        Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="text-gray-300 hover:text-white transition-colors duration-300">
                    <UserIcon />
                  </Link>
                )}
              </div>
              <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-300 hover:text-white transition-colors duration-300 z-50 relative">
                  {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center space-y-8">
              <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-white' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/shop" onClick={closeMenu} className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-white' : ''}`}>
                Shop
              </NavLink>
              <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-white' : ''}`}>
                Contact
              </NavLink>
              {user?.role === 'admin' && (
                 <NavLink to="/admin" onClick={closeMenu} className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-white' : ''}`}>
                  Admin Panel
                </NavLink>
              )}
              {user ? (
                <>
                  <NavLink to="/account" onClick={closeMenu} className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-white' : ''}`}>
                    My Account
                  </NavLink>
                  <button onClick={() => { handleLogout(); closeMenu(); }} className={mobileNavLinkClasses}>
                    Logout
                  </button>
                </>
              ) : (
                <NavLink to="/login" onClick={closeMenu} className={({ isActive }) => `${mobileNavLinkClasses} ${isActive ? 'text-white' : ''}`}>
                  Login / Register
                </NavLink>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
