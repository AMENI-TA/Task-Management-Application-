
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // Importation du composant ProtectedRoute

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          {/* Route protégée : utilisez ProtectedRoute pour la page d'accueil */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
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
