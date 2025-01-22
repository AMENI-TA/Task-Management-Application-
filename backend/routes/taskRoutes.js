

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
const { createTask, getTasks } = require("../controllers/userController");
const Task = require('../models/Task');
const { protect } = require('../middleware/authMiddleware');

// Ajouter une tâche
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

// Récupérer les tâches de l'utilisateur authentifié
router.get('/', protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user });
  res.json(tasks);
});


// Route pour créer une tâche
router.post("/", protect, createTask);

// Route pour obtenir les tâches de l'utilisateur connecté
router.get("/", protect, getTasks);

const { updateTask, deleteTask } = require('../controllers/userController');

// Mettre à jour une tâche
router.put('/:id', protect, updateTask);

// Supprimer une tâche
router.delete('/:id', protect, deleteTask);



module.exports = router;
