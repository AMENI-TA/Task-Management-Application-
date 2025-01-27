

/*const express = require ('express');
const router = express.Router();

const {getAllUsers,createUser,findUser,updateUser,deleteUser}= require('../controllers/userController')

router.get('/', getAllUsers );
router.post('/', createUser);
router.get('/:id', findUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser)


// HTTP:// localhost:3005/users:id  */


/*const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Exemple de route d'enregistrement
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: 'User created' });
});  */




const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { findOne } = require('../models/Task');
dotenv.config();

// Route pour l'inscription
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Route pour la connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }



      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

     
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  router.get("/users/:id", async (req, res) => {
    try {
      const userId = req.params.id; // Récupère l'ID depuis les paramètres de l'URL
      const user = await User.findById(userId); // Utilise findById pour récupérer la tâche
  
      if (!user) {
        return res.status(404).json({ message: "user with this id not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur.", error: error.message });
    }
  });
  

  
  module.exports = router;
  





