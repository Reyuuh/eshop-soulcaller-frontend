// src/pages/PaymentPage/PaymentPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../../components/PaymentForm/PaymentForm.jsx";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = (result) => {
    console.log("Payment success:", result);
    // maybe store something in state or context
    navigate("/thankyou");
  };

  return (
    <div className="payment-page">
      <h1>Checkout</h1>
      <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
    </div>
  );
};

export default PaymentPage;
