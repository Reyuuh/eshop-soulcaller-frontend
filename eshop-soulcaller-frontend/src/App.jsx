// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx' 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/AdminPage/AdminPage.jsx'
import LoginUser from './pages/LoginUser/LoginUser.jsx'
import RegUser from './pages/RegUser/RegUser.jsx'    
import PaymentPage from './pages/PaymentPage/PaymentPage.jsx'


function App() {

  return (
      <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegUser />} /> 
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
