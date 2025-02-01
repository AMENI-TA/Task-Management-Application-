import React from "react";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <h1>Gestionnaire de tâches</h1>
      {isAuthenticated && (
        <button onClick={onLogout}>Se déconnecter</button>
      )}
    </nav>
  );
};

export default Navbar;
