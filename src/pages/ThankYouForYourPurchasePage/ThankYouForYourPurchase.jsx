import React, { useEffect } from "react";
import ThankYou from "../../components/ThankYou/ThankYou";
import { useCart } from "../../context/CartContext";

const ThankYouForYourPurchase = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart(); // tömmer state + localStorage (med din uppdaterade clearCart)
  }, [clearCart]);

  return <ThankYou />;
};

export default ThankYouForYourPurchase;
