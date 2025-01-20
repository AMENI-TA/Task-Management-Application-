

const User = require('../models/User')


//get

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();  // Récupérer tous les utilisateurs de la base de données
      res.status(200).json(users);  // Envoyer la liste des utilisateurs en réponse
    } catch (err) {
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };


//CREATE

const createUser = async (req, res) =>{

    try{ 
        const user = await User.create({
            name: req.body.name,
            email: req.body.email
        })
        res.status(200).json({
            message: "✅ User was created successflly!",
            user: user
        })
    }
    catch(err){
        res.status(400).json({ message: 'Error while creating the user', err})
    }
}


// READ

const findUser= async (req,res)=>{
    try{
        console.log(req.params.id)
        const user =await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({
                message:`this ID:${req.params.id} is not found! please try with another ID`,
                user
            })
        }

        res.status(200).json({
          message:`informations of this ID ${req.params.id}`,
          user
        })
    }
    catch(err){
        res.status(400).json(err)
    }
}


//UPDATE
 
const updateUser= async (req, res)=>{
    try{

        const user = await User.findByIdAndUpdate(req.params.id,
            {name: req.body.name, email: req.body.email},
            {new: true}
        )
    if(!user){
        res.status(400).json({
            message: `there is no user with this id ${req.params.id} please check`
        })
    }
    res.status(200).json({
        message: `YES! user with this id ${req.params.id} was updated successfully`,
        user
    })
    }
    catch(err){
        res.status(400).json(err)
    }
}

//DELETE

const deleteUser = async (req,res)=>{
    try{
        const deleteUser= await User.findByIdAndDelete(req.params.id)

        if(!deleteUser){
            res.status(400).json({
                message: `user with this id ${req.params.id} is not found`
            })
        }
        res.status(200).json({
            message: `user with this id ${req.params.id} was deleted successfully`
        })
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = {getAllUsers,createUser,findUser,updateUser,deleteUser}

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
  
  
  