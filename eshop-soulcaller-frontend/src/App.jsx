import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import LoginUser from "./pages/LoginUser/LoginUser.jsx";
import RegUser from "./pages/RegUser/RegUser.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<div style={{ padding: 24 }}>Home</div>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegUser />} />
        <Route path="/cart" element={<ShoppingCart />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
