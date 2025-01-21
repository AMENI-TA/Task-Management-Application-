
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si l'utilisateur est authentifié

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Route protégée : redirige vers la page de connexion si l'utilisateur n'est pas authentifié */}
          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
          />
          {/* Route pour la connexion */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route pour l'inscription */}
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
