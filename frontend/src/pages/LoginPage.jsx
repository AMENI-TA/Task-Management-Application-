

import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await loginUser(credentials);
      localStorage.setItem("token", token);
      toast.success("Connexion réussie !");
      navigate("/"); // Redirige vers la page d'accueil après connexion
    } catch (error) {
      console.error("Erreur de connexion :", error);
      toast.error("Échec de la connexion : vérifiez vos informations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Se connecter</h1>
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
        {loading ? "Connexion en cours..." : "Se connecter"}
      </button>
    </form>
  );
};

export default LoginPage;
