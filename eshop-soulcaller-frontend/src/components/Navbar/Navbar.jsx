import React, { useState, useEffect } from 'react';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { useCart } from '../../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import '../ShoppingCart/ShoppingCart.scss';
import logo from '../../assets/brineline-logo-GmS2BPiR.png';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isLoggedIn = !!token;

  useEffect(() => {
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
