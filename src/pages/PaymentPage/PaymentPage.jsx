import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import StripeCheckoutButton from "../../components/Checkout/StripeCheckoutButton";
import "./PaymentPage.scss";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="payment-page">
        <h1>Your cart is empty</h1>
        <button onClick={() => navigate("/")}>Return to Shop</button>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        {/* LEFT: Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul className="cart-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <div>
                    <img src={item.img_url} alt={item.name} />
                  </div>
                  <span className="item-quantity">x{item.quantity}</span>
                </div>
                <span className="item-price">
                  {(item.price * item.quantity).toFixed(2)} kr
                </span>
              </li>
            ))}
          </ul>

          <div className="order-total">
            <strong>Total Amount:</strong>
            <strong>{getTotalPrice().toFixed(2)} kr</strong>
          </div>
        </div>

        {/* RIGHT: Stripe Checkout Redirect */}
        <div className="payment-section">
          <h2>Payment</h2>
          <p>You will be redirected to Stripe to complete your payment.</p>
          <StripeCheckoutButton />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
