

import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si l'utilisateur est authentifié

  // Si l'utilisateur n'est pas authentifié, on le redirige vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Sinon, on affiche les enfants (la page protégée)
  return children;
};

export default ProtectedRoute;
