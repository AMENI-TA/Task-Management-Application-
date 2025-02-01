

/*import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation locale du mot de passe
    if (credentials.password.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(credentials); // Appel API centralisé
      toast.success("Inscription réussie !");
      navigate("/login"); // Redirection vers la page de connexion
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      toast.error("Échec de l'inscription. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Créer un compte</h1>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Inscription en cours..." : "S'inscrire"}
      </button>
    </form>
  );
};

export default RegisterPage;
*/


// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { registerUser } from "../api/authApi";  // Utilisation de registerUser

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await registerUser(userData);  // Appel de la fonction registerUser
      console.log("User registered:", newUser);
      // Ajouter ici la gestion du token ou de la session utilisateur
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={userData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={userData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={userData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
