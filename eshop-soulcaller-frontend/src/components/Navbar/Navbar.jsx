import React, { useState } from 'react';
import ShoppingCart from '../ShoppingCart/ShoppingCart'; // Add this import
import './Navbar.scss';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // New state for cart toggle

  return (
    <header className="navbar">
      <div className="navbar__container">
        <a className="navbar__logo" href="/">Soulcaller</a>

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
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register User</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </nav>

        {/* Add cart button and dropdown */}
        <button
          className="navbar__cart-toggle"
          onClick={() => setCartOpen(!cartOpen)}
          aria-label="Toggle cart"
        >
          🛒 Cart
        </button>
        {cartOpen && (
          <div className="navbar__cart-dropdown">
            <ShoppingCart />
          </div>
        )}
      </div>
    </header>
  );
}