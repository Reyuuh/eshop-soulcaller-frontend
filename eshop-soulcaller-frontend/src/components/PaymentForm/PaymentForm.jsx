import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './PaymentForm.scss';

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Create payment method with Stripe
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          name: formData.name,
          email: formData.email,
          address: { line1: formData.address }
        }
      });

      if (methodError) throw methodError;

      // Send to backend to process payment
      const response = await fetch('http://localhost:8080/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: 1000, // in cents
          ...formData
        })
      });

      const result = await response.json();
      if (result.success) {
        onPaymentSuccess(result);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
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
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />

        {error && <div className="error-message">{error}</div>}

        <button id="login-btn" type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Confirm Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;