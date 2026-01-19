import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const { clearCart } = useCart();

  useEffect(() => {
    // Optional: clear cart client-side (your real source of truth should be webhook + DB)
    clearCart();
    navigate("/thankyou", { replace: true, state: { sessionId } });
  }, [clearCart, navigate, sessionId]);

  return <div>Payment successful. Redirecting...</div>;
}
