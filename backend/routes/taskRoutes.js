const express = require('express');
const router = express.Router();
const {  createTask, getTasks, getTaskById, updateTask, deleteTask } = require("../controllers/taskController");
const { protect } = require('../middleware/authMiddleware');

  /*
const {createTask,getTasks,updateTask,deleteTask}= require('../controllers/taskController')

router.post('/', createTask );
router.get('/', getTasks);
router.put('/:id', updateTask);
router.deletet('/:id', deleteTask);


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
router.get("/:id",protect, async (req, res) => {
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


const mongoose = require('mongoose');

*/


/*
// 4. Route pour mettre à jour une tâche

router.put("/:id", protect, async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;

    // Trouver la tâche à mettre à jour
    const task = await Task.findById(req.params.id);

    // Vérifier si la tâche existe
    if (!task) {
      return res.status(404).json({ message: "Tâche introuvable." });
    }

    // Loguer les valeurs pour déboguer
    console.log('User:', req.user);
    console.log('Task ID:', task._id.toString());

    // Vérifier si l'utilisateur est authentifié et si la tâche lui appartient
    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur non authentifié." });
    }
    if (task._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Non autorisé à modifier cette tâche." });
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
*/
// 5. Route pour supprimer une tâche
/*router.delete("/:id", protect, async (req, res) => {
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
*/


//supprime une tâche

/*router.delete("/:id", protect, async (req, res) => {


  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id }); // Supprime la tâche uniquement si elle appartient à l'utilisateur

    if (!task) throw new Error('Task not found');

    res.json({ message: 'Task deleted successfully' });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
*/


// Route pour créer une tâche :on applique le middleware d'authentification avant d'appeler la fonction de création de tâche
router.post('/add', protect, createTask); 

// Route pour mettre à jour une tâche existante spécifique par ID 
router.put('/:id',protect, updateTask);  

// Route pour obtenir une tâche spécifique par ID 
router.get('/:id',protect, getTaskById);   

// Route pour obtenir toutes les tâches de l'utilisateur authentifié
router.get('/', protect, getTasks);  

// Route pour supprimer une tâche spécifique par ID 
router.delete('/:id', protect, deleteTask);  

module.exports = router;