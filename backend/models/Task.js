

/*const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;  */

/*
const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;  */


const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Titre de la tâche
  description: { type: String, default: "" }, // Description de la tâche
  deadline: { type: Date, required: true }, // Date limite
  status: { type: String, default: "Pending" }, // Statut (par défaut : "Pending")
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ID utilisateur
}, 
{ timestamps: true }); // Ajoute les champs createdAt et updatedAt

module.exports = mongoose.model("Task", taskSchema);

