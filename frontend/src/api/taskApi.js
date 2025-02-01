

/*import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Obtenir toutes les tâches
export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

// Ajouter une nouvelle tâche
export const addTask = async (task) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};
*/

// src/api/taskApi.js
import API from './api';  // Utilisation de l'instance axios

// Fonction pour récupérer toutes les tâches
export const fetchTasks = async () => {
  try {
    const response = await API.get('/tasks');  // Exemple d'URL
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des tâches');
  }
};

// Fonction pour créer une nouvelle tâche
export const createTask = async (taskData) => {
  try {
    const response = await API.post('/tasks', taskData);  // Envoi des données pour créer une tâche
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la création de la tâche');
  }
};

// Fonction pour mettre à jour une tâche
export const updateTask = async (taskId, updatedData) => {
  try {
    const response = await API.put(`/tasks/${taskId}`, updatedData);  // Mise à jour de la tâche
    return response.data;
  } catch (error) {
    throw new Error('Erreur lors de la mise à jour de la tâche');
  }
};

// Fonction pour supprimer une tâche
export const deleteTask = async (taskId) => {
  try {
    await API.delete(`/tasks/${taskId}`);  // Suppression de la tâche
  } catch (error) {
    throw new Error('Erreur lors de la suppression de la tâche');
  }
};
