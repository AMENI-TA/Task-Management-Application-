

/*const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Exemple de route pour créer une tâche
router.post('/add', async (req, res) => {
  const { user, title, description, deadline } = req.body;
  const task = new Task({ user, title, description, deadline });
  await task.save();
  res.status(201).json({ message: 'Task created' });
});

*/

const express = require('express');
const router = express.Router();
const { createTask, getTasks } = require("../controllers/taskController");
const Task = require('../models/Task');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

/* // Ajouter une tâche
router.post('/add', protect, async (req, res) => {
  
  const { title, description, deadline } = req.body;

  const task = new Task({
    user: req.user,  // Associer la tâche à l'utilisateur authentifié
    title,
    description,
    deadline,
    
  });
  

  await task.save();
  res.status(201).json({ message: 'Task created' });
});
*/



// Route pour ajouter une tâche

/*router.post("/add", async (req, res) =>{
  try{
  const { title, description } = req.body;
  const {id} = req.headers
  const newTask = new task ({ title: title, description: description});
  const saveTask = await newTask.save();
  const taskId = saveTask._id;
  await User.findByIdAndUpdate(id, {$push: { tasks: taskId._id }});
  res.status(200).json({message:"task Created"})
  }
  catch (error){
  console.log(error);
  res.status(400).json({message: "server error"})
  }
  
  });*/

  

/*router.post("/add", async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    const { id } = req.headers; // ID de l'utilisateur récupéré dans les en-têtes

    // Vérifier que l'utilisateur existe
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    // Créer une nouvelle tâche
    const newTask = new Task({ title, description, deadline });
    const savedTask = await newTask.save();  

    // Ajouter l'ID de la tâche au tableau des tâches de l'utilisateur
    user.tasks.push(savedTask._id);
    await user.save();

    res.status(201).json({ message: "Tâche créée avec succès.", task: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
});  */


/*router.post("/add", protect, async (req, res) => {
  try {
    const { title, description, deadline } = req.body;

    // Vérification des champs obligatoires
    if (!title || !description || !deadline) {
      return res.status(400).json({ message: "Tous les champs sont requis." });
    }

    // Créer une nouvelle tâche et l'associer à l'utilisateur connecté
    const newTask = new Task({
      user: req.user._id, // ID de l'utilisateur connecté
      title,
      description,
      deadline,
    });

    // Sauvegarder la tâche
    const savedTask = await newTask.save();
    console.log(1)

    res.status(201).json({ message: "Tâche créée avec succès.", task: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }

});

*/

router.post("/add", async (req, res) => {
  try {
    const { id, title, description, deadline } = req.body; // Récupérer l'ID depuis le body

    if (!id) {
      return res.status(400).json({ message: "L'ID utilisateur est requis." });
    }

    const newTask = new Task({
      id, // Associer l'ID utilisateur
      title,
      description,
      deadline,
    });

    const savedTask = await newTask.save();
    res.status(201).json({ message: "Tâche créée avec succès.", task: savedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
});


// 2. Route pour récupérer les tâches de l'utilisateur authentifié
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ id: req.user._id }); // Filtrer les tâches de l'utilisateur connecté
    res.status(200).json({message: "Task created successfully.",tasks});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
});

// 3. Route pour récupérer une tâche spécifique par son ID
router.get("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Vérifier si la tâche existe et appartient à l'utilisateur connecté
    //if (!task || task.id.toString() !== req.user._id.toString()) {
     // return res.status(404).json({ message: "Task not found or not authorized." });
   // }


    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/*
const mongoose = require('mongoose');

// 3. Route pour récupérer une tâche spécifique par son ID
router.get("/:id", protect, async (req, res) => {
  try {
    // Vérifier si l'ID est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    // Recherche de la tâche par son ID
    const task = await Task.findById(req.params.id);

    // Vérifier si la tâche existe et appartient à l'utilisateur connecté
    if (!task || task.id.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Task not found or not authorized." });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
*/

// 4. Route pour mettre à jour une tâche
router.put("/:id", protect, async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;

    // Trouver la tâche à mettre à jour
    const task = await Task.findById(req.params.id);

    // Vérifier si la tâche existe et appartient à l'utilisateur connecté
    if (!task || task.id.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Tâche introuvable ou non autorisée." });
    }

    // Mettre à jour les champs de la tâche
    task.title = title || task.title;
    task.description = description || task.description;
    task.deadline = deadline || task.deadline;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.status(200).json({ message: "Tâche mise à jour avec succès.", task: updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
});

// 5. Route pour supprimer une tâche
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Vérifier si la tâche existe et appartient à l'utilisateur connecté
    if (!task || task.id.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Tâche introuvable ou non autorisée." });
    }

    await task.remove();
    res.status(200).json({ message: "Tâche supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur.", error: error.message });
  }
});

module.exports = router;