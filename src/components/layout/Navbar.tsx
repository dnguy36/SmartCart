import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Receipt, Package, PieChart, Settings, Menu, X, LogOut } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  const navItems = [
    { path: '/', icon: <ShoppingCart size={20} />, label: 'Dashboard' },
    { path: '/receipts', icon: <Receipt size={20} />, label: 'Receipts' },
    { path: '/pantry', icon: <Package size={20} />, label: 'Pantry' },
    { path: '/budget', icon: <PieChart size={20} />, label: 'Budget' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' }
  ];

  if (!isAuthenticated) {
    return null; // Don't show navbar on sign in page
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingCart size={28} className="text-emerald-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent">
            SmartCart
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
              onClick={closeMenu}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-600 hover:text-emerald-600 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 flex flex-col space-y-2 transition-all duration-300 ease-in-out">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
              }`}
              onClick={closeMenu}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;