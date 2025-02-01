

import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import API from "../utils/api";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger les tâches de l'utilisateur
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/tasks");
      setTasks(data);
      setError(null); // Réinitialiser l'erreur en cas de succès
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-page">
      <h1>Your Tasks</h1>

      {/* Affichage d'un message d'erreur si nécessaire */}
      {error && <div className="error-message">{error}</div>}

      {/* Affichage de l'indicateur de chargement */}
      {loading ? (
        <div className="loading">Loading tasks...</div>
      ) : (
        <>
          <TaskForm fetchTasks={fetchTasks} />
          <TaskList tasks={tasks} />
        </>
      )}
    </div>
  );
};

export default TasksPage;
