

import React, { useEffect, useState } from 'react';
import { fetchTasks, createTask } from '../api/taskApi';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      const token = localStorage.getItem('token'); // Récupère le token utilisateur
      const data = await fetchTasks(token);
      setTasks(data);
    };

    fetchAllTasks();
  }, []);

  const handleTaskCreated = async (task) => {
    const token = localStorage.getItem('token');
    const newTask = await createTask(task, token);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div>
      <h1>Mes tâches</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList tasks={tasks} />
    </div>
  );
};


const handleUpdateTask = async (task) => {
    const token = localStorage.getItem('token');
    const updatedTask = await updateTask(task._id, task, token);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };
  
  const handleDeleteTask = async (taskId) => {
    const token = localStorage.getItem('token');
    await deleteTask(taskId, token);
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
  };

  const handleFilterChange = (status) => {
    if (status) {
      setTasks((prevTasks) => prevTasks.filter((t) => t.status === status));
    } else {
      // Recharger toutes les tâches
      fetchAllTasks();
    }
  };
  
  const handleSortChange = (sortBy) => {
    const sortedTasks = [...tasks];
    if (sortBy === "deadline") {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortBy === "priority") {
      sortedTasks.sort((a, b) => b.priority - a.priority);
    }
    setTasks(sortedTasks);
  };
  
  

export default HomePage;
