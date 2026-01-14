import React, { useState, useEffect } from 'react';
import ShoppingCart from '../ShoppingCart/ShoppingCart';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import '../ShoppingCart/ShoppingCart.scss';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  const location = useLocation();

  // 🔑 If route changes to /payment, auto-close the cart
  useEffect(() => {
    if (location.pathname === '/payment') {
      setCartOpen(false);
    }
  }, [location.pathname]);

  return (
    <header className="navbar">
      <div className="navbar__container">
        <Link className="navbar__logo" to="/">Soulcaller</Link>

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
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register User</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>

        {/* Cart button + badge */}
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

      {/* Side drawer + overlay */}
      {cartOpen && (
        <>
          <div
            className="shoppingcart-overlay"
            onClick={() => setCartOpen(false)}
          />
          <div className="shoppingcart-panel">
            {/* 👇 onClose is what Checkout will call */}
            <ShoppingCart onClose={() => setCartOpen(false)} />
          </div>
        </>
      )}
    </header>
  );
}
