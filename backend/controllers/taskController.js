
const Task = require("../models/Task");
/*
const createTask = async (req, res) => {
  const { id, title, description, deadline } = req.body; // Récupérer l'ID depuis le body

  try {
    
    const newTask = new Task({
      id, // Associer l'ID utilisateur
      title,
      description,
      deadline,
    });


    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task.", error });
  }
};
*/


// I- Créer une nouvelle tâche

const createTask = async (req, res) => {
  try {
    const { id, title, description, deadline } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({ message: "Title and deadline are required." });
    }

    const task = new Task({
      id,
      title,
      description,
      deadline,
      userId: req.user.id, // Utilisateur connecté
    });

    const savedTask = await task.save();
    res.status(201).json({ message: "task created successfully", savedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task.", error });
  }
};


  // II- mettre à jour une tâche

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findOneAndUpdate({ _id: id, userId: req.user.id },   // Cherche une tâche avec cet ID appartenant à l'utilisateur

      req.body,    // Utilise les données du corps de la requête pour mettre à jour la tâche

      { new: true });  // Retourne la tâche mise à jour au lieu de l'ancienne
    if (!task) throw new Error('Task not found');

    res.json({ message: "task updated successfully!", task });  // Renvoie la tâche mise à jour à l'utilisateur.

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// III- Route pour récupérer une tâche spécifique par son ID

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    res.status(200).json({ message: "success!", task });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Server error", error: error.message });
  }
};
/*
// récupère une tâche

const getTaskById = async (req, res) => {

  const { id } = req.params;   // Récupère l'identifiant de la tâche

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id });  // Cherche une tâche spécifique avec cet ID appartenant à l'utilisateur

    if (!task) throw new Error('Task not found');

    res.json(task);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

*/

// IV- Récupérer les tâches de l'utilisateur connecté

const getTasks = async (req, res) => {
  
  try {
      const tasks = await Task.find({ userId: req.user.id }).sort({ deadline: 1 });
      res.status(200).json({ message: "success!", tasks });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks.", error });
    }
  };

  
  /*
// Mettre à jour une tâche
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, deadline, status } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    // Loguer les valeurs pour le débogage
    console.log('req.user:', req.user);
    console.log('task.user:', task.user);

    if (!req.user || task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé à modifier cette tâche" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erreur lors de la mise à jour" });
  }
};
*/
  
  // Supprimer une tâche


  /*const deleteTask = async (req, res) => {
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
  */

   // V- Supprimer une tâche

  const deleteTask = async (req, res) => {

    const { id } = req.params;     // Récupère l'identifiant de la tâche à supprimer
  
    try {
      const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id }); // Supprime la tâche uniquement si elle appartient à l'utilisateur
  
      if (!task) throw new Error('Task not found');
  
      res.json({ message: 'Task deleted successfully' });
  
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };


  module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
  
  
  