// import { useState } from 'react'
import './App.css'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import LoginUser from './pages/LoginUser/LoginUser.jsx'
import RegUser from './pages/RegUser/RegUser.jsx'    
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx'
import ThankYouForYourPurchase from './pages/ThankYouForYourPurchasePage/ThankYouForYourPurchase.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProductPage from './pages/ProductPage/ProductPage.jsx'
import SingleProductPage from './pages/SingleProductPage/SingleProductPage.jsx'

const stripePromise = loadStripe("YOUR_PUBLISHABLE_KEY"); // Get from Stripe Dashboard


function App() {
  return (
    <>
      <Navbar />

      <Elements stripe={stripePromise}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegUser />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thankyou" element={<ThankYouForYourPurchase />} />
      </Routes>
    </Elements>
      <Footer />
    </>
  );
}

export default App;