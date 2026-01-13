import React from 'react';
import { useCart } from '../../context/CartContext';
import './ShoppingCart.scss';
import {Link } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${getTotalPrice().toFixed(2)}</h3>
            <button onClick={handleClearCart} className="clear-btn">Clear Cart</button>
            <Link to="/payment" className="checkout-btn">Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;