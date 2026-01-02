import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import About from './pages/about/About.jsx'
// import Home from './pages/home/Home.jsx'
// import Products from './pages/products/Products.jsx'     


function App() {

  return (
       <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />
        {/* <Route path="/products" element={<Products />} /> */}
      </Routes>
      <Footer />
    </Router>
  )
}

export default App;
