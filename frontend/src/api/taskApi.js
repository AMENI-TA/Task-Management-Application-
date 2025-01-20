

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

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

// Récupérer les tâches
export const fetchTasks = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Ajouter une tâche
export const createTask = async (task, token) => {
  const response = await axios.post(API_URL, task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Mettre à jour une tâche
export const updateTask = async (id, updates, token) => {
    const response = await axios.put(`${API_URL}/${id}`, updates, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  
  // Supprimer une tâche
  export const deleteTask = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };
  