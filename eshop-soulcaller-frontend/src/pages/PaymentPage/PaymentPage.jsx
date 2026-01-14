import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../../components/PaymentForm/PaymentForm.jsx";
import { useCart } from "../../context/CartContext"; // ⬅️ Importera din hook
import "./PaymentPage.scss"; // Glöm inte att styla listan

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice } = useCart(); // ⬅️ Hämta data från din korg

  const handlePaymentSuccess = (result) => {
    console.log("Payment success:", result);
    navigate("/thankyou");
  };

  // Om korgen är tom kan vi visa ett meddelande istället för formuläret
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
        {/* VÄNSTER SIDA: Order Summary */}
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

        {/* HÖGER SIDA: Stripe Formulär */}
        <div className="payment-section">
          <h2>Payment Details</h2>
          <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;