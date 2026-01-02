import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'
import LayoutPage from "./pages/LayoutPage/LayoutPage";
import Modal from "./components/Modal/Modal";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginUser, logoutUser } from "./redux/slices/userSlice";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const { email, username, role } = decodedToken;
      dispatch(loginUser({ email, username, role, token }));
    }
    if (!token) {
      dispatch(logoutUser());
      navigate("/");
    }
    window.addEventListener('beforeunload', () => {
      localStorage.removeItem('token');
    });
  }, [dispatch, navigate, token]);

  // Dynamiskt lägga till eller ta bort klassen för bakgrundsbild
  useEffect(() => {
    if (location.pathname === "/") {
      document.body.classList.add("hero-background");
    } else {
      document.body.classList.remove("hero-background");
    }
    if (location.pathname === "/auth") {
      document.body.classList.add("hero-auth-background");
    } else {
      document.body.classList.remove("hero-auth-background");
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <Routes>
        <Route element={<LayoutPage />}>
          {/* Offentliga sidor */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Skyddade routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<DashboardPage />} />}
          />
        </Route>
        {/* 404-sida */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Modal />
    </div>
  );
};

export default App;
