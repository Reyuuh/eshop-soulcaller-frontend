import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentForm.scss";
import { useCart } from "../../context/CartContext";

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, clearCart, getTotalPrice } = useCart();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const { error: methodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: { line1: formData.address },
          },
        });

      if (methodError) throw methodError;

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to complete the payment.");
        setLoading(false);
        return;
      }

      let userId = null;

      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payloadJson = atob(base64);
        const payload = JSON.parse(payloadJson);

        console.log("Decoded JWT payload:", payload);
        userId = payload.sub;
      } catch (e) {
        console.error("Failed to decode JWT:", e);
        setError("Authentication error. Please log in again.");
        setLoading(false);
        return;
      }

      if (!userId) {
        setError("You must be logged in to complete the payment.");
        setLoading(false);
        return;
      }

      const cartPayload = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        unitPrice:
          typeof item.price === "string" ? parseFloat(item.price) : item.price,
      }));

      const totalPrice = getTotalPrice(); // in SEK
      const amountInOre = Math.round(totalPrice * 100); // Stripe uses öre

      const response = await fetch("http://localhost:8080/payment/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: amountInOre,
          name: formData.name,
          email: formData.email,
          address: formData.address,
          userId,
          cartItems: cartPayload,
        }),
      });

      const result = await response.json();

      if (result.success) {
        onPaymentSuccess(result);
        clearCart();
      } else {
        setError(result.message || "Payment failed.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} id="payment-form">
        <h2>Payment Information</h2>

        <label htmlFor="name">Name on Card:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name on Card"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Card Details:</label>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />

        {error && <div className="error-message">{error}</div>}

        <button id="login-btn" type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
