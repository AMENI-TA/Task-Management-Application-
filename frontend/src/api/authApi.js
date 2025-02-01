

/* import axios from "axios";

const BASE_URL = process.env.REACT_APP_AUTH_URL || "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials);
    return response.data.token;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Une erreur est survenue");
  }
};
*/

// src/api/authApi.js
// src/api/authApi.js
import API from './api';  // Importation de l'instance axios configurée

// Fonction pour l'authentification
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);  // Exemple d'URL
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la connexion');
  }
};


// Fonction pour l'enregistrement
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);  // Exemple d'URL
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de l\'inscription');
  }
};