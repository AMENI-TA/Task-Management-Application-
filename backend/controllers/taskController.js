


const Task = require("../models/Task");

// Créer une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({ message: "Title and deadline are required." });
    }

    const task = new Task({
      title,
      description,
      deadline,
      userId: req.user.id, // Utilisateur connecté
    });


    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task.", error });
  }
};



// Récupérer les tâches de l'utilisateur connecté
const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ userId: req.user.id }).sort({ deadline: 1 });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks.", error });
    }
  };
  // Mettre à jour une tâche
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, deadline, status } = req.body;
  
    try {
      const task = await Task.findById(id);
  
      if (!task || task.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      task.title = title || task.title;
      task.description = description || task.description;
      task.deadline = deadline || task.deadline;
      task.status = status || task.status;
  
      const updatedTask = await task.save();
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour" });
    }
  };
    

  
  // Supprimer une tâche
  const deleteTask = async (req, res) => {
    const { id } = req.params;
  
    try {
      const task = await Task.findById(id);
  
      if (!task || task.user.toString() !== req.user._id.toString()) {
        return res.status(404).json({ message: "Tâche non trouvée" });
      }
  
      await task.remove();
      res.status(200).json({ message: "Tâche supprimée avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression" });
    }
  };   
  
  module.exports = { createTask, getTasks, updateTask, deleteTask };
  
  
  