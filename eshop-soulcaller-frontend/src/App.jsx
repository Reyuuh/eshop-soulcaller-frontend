import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import LoginUser from "./pages/LoginUser/LoginUser.jsx";
import RegUser from "./pages/RegUser/RegUser.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<RegUser />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
