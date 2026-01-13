import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    // Ändra till import.meta.env och rätt variabelnamn
    const key = "pk_test_51RYMfSCQzKxbZyDLtIU4YheYNIXRrCBXYC7uakgrXHW6saRzmbHMYV0Ltox9pDlm1qIqDows6uPB1fm8tWyQrX3s00j16wIEVv";
    console.log("Stripe Publishable Key:", key);
    
    if (!key) {
      console.error("Stripe Publishable Key saknas!");
    }
    
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};

export default getStripe;