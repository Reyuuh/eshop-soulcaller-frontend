import React, { useState, useEffect } from 'react';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { useCart } from '../../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchCategories } from '../../services/api.js'; // Importera din API-funktion
import './Navbar.scss';
import '../ShoppingCart/ShoppingCart.scss';
import logo from '../../assets/brineline-logo-GmS2BPiR.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [categories, setCategories] = useState([]); // State för kategorier
  const [dropdownOpen, setDropdownOpen] = useState(false); // State för dropdown

  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  // Hämta kategorier när komponenten laddas
  useEffect(() => {
    const getCats = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Kunde inte hämta kategorier till nav:", err);
      }
    };
    getCats();
  }, []);

  // Stäng menyer när man byter sida
  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
    if (location.pathname === '/payment') {
      setCartOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link className="navbar__logo" to="/">
          <img src={logo} alt="Logo" /> BRINELINE GAMES SHOP
        </Link>

        <button
          className={`navbar__toggle ${open ? 'open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>

        <nav className={`navbar__nav ${open ? 'open' : ''}`}>
          <ul>
            <li><Link to="/">Home</Link></li>

            {/* --- DROPDOWN START --- */}
            <li 
              className="navbar__dropdown"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="dropdown-trigger">
                Categories ▾
              </button>
              
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  {categories.map(cat => (
                    <li key={cat.id || cat._id}>
                      <Link to={`/categories/${cat.id || cat._id}`}>
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {/* --- DROPDOWN END --- */}

            {!isLoggedIn && (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register User</Link></li>
              </>
            )}

            {isLoggedIn && role === 'admin' && (
              <li><Link to="/admin">Admin</Link></li>
            )}

            {isLoggedIn && (
              <li>
                <button
                  type="button"
                  className="navbar__logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>

        <button
          className="navbar__cart-toggle"
          onClick={() => setCartOpen(true)}
          aria-label="Toggle cart"
        >
          🛒 Cart
          {itemCount > 0 && (
            <span className="navbar__cart-count">{itemCount}</span>
          )}
        </button>
      </div>

      {cartOpen && (
        <>
          <div
            className="shoppingcart-overlay"
            onClick={() => setCartOpen(false)}
          />
          <div className="shoppingcart-panel">
            <ShoppingCart onClose={() => setCartOpen(false)} />
          </div>
        </>
      )}
    </header>
  );
}