import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const { clearCart } = useCart();

  useEffect(() => {
    // Debug så du ser att sidan körs:
    console.log("CheckoutSuccess loaded, session_id:", sessionId);

    clearCart(); // ✅ tömmer state + localStorage (med din nya clearCart)
    navigate("/thankyou", { replace: true });
  }, [clearCart, navigate, sessionId]);

  return <div>Payment successful. Redirecting...</div>;
}
