import React, { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function StripeCheckoutButton() {
  const { cartItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
  setLoading(true);
  setError(null);

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Du måste vara inloggad för att betala.");
      setLoading(false);
      return;
    }

    // decode JWT -> userId (som du gjorde innan)
    let userId = null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payloadJson = atob(base64);
      const payload = JSON.parse(payloadJson);
      userId = payload.sub; // samma som tidigare
    } catch (e) {
      setError("Authentication error. Logga in igen.");
      setLoading(false);
      return;
    }

    const response = await fetch("http://localhost:8080/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || "Kunde inte starta checkout.");
    }

    window.location.href = data.url;
  } catch (e) {
    setError(e.message);
    setLoading(false);
  }
};

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading || cartItems.length === 0}>
        {loading ? "Skickar vidare..." : "Gå till betalning"}
      </button>

      {error && <p style={{ marginTop: 8 }}>{error}</p>}
    </div>
  );
}
