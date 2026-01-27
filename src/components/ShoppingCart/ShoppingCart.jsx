import React from 'react';
import { useCart } from '../../context/CartContext';
import './ShoppingCart.scss';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleCheckout = () => {
    // 👉 if you want to keep items for the payment page, do NOT clearCart here
    // clearCart(); // only use this if you really want to empty the cart

    // if you have some "close cart" state in context, you could also call: closeCart();
    navigate('/payment');
  };

  return (
    <div className="shoppingcart-overlay">
      <div className="shoppingcart-panel">
        <div className="shopping-cart">
          <h2 className="shopping-cart-title">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.id} className="cart-item">
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>{item.price.toFixed(2)} SEK</p>
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
                <h3>Total: {getTotalPrice().toFixed(2)} SEK</h3>
                <button onClick={handleClearCart} className="clear-btn">Clear Cart</button>

                {/* changed from <Link> to <button> */}
                <button onClick={handleCheckout} className="checkout-btn">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
