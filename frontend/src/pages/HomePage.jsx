

import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  const fetchAllTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const data = await fetchTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("Erreur lors du chargement des tâches :", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleTaskCreated = async (task) => {
    const token = localStorage.getItem("token");
    const newTask = await createTask(task, token);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = async (task) => {
    const token = localStorage.getItem("token");
    const updatedTask = await updateTask(task._id, task, token);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem("token");
    await deleteTask(taskId, token);
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
  };

  return (
    <div>
      <h1>Mes tâches</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList
        tasks={tasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
      />
    </div>
  );
};

export default HomePage;
