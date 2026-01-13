import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    // Ändra till import.meta.env och rätt variabelnamn
    const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    console.log("Stripe Publishable Key:", key);
    
    if (!key) {
      console.error("Stripe Publishable Key saknas!");
    }
    
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStripe;