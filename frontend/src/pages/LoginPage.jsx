

import React, { useState } from "react";
import { loginUser } from "../api/authApi";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await loginUser(credentials);
      localStorage.setItem("token", token);
      alert("Connexion réussie !");
    } catch (error) {
      console.error("Erreur de connexion :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Se connecter</button>
    </form>
  );
};

export default LoginPage;
