

/*import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, deadline });
    setTitle('');
    setDescription('');
    setDeadline('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre de la tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
};

export default TaskForm;
*/

import React, { useState } from "react";

const TaskForm = ({ onTaskCreated, initialTask = null }) => {
  const [task, setTask] = useState(initialTask || { title: "", description: "", priority: 1 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

 /* const handleSubmit = (e) => {
    e.preventDefault();
    onTaskCreated(task);
    setTask({ title: "", description: "", priority: 1 });
  };
*/

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim().length < 3) {
      alert("Le titre doit comporter au moins 3 caractères");
      return;
    }
    onTaskCreated(task);
    setTask({ title: "", description: "", priority: 1 });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Titre de la tâche"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value={1}>Faible</option>
        <option value={2}>Moyenne</option>
        <option value={3}>Élevée</option>
      </select>
      <button type="submit">{initialTask ? "Modifier" : "Ajouter"}</button>
    </form>
  );
};


const handleSubmit = (e) => {
  e.preventDefault();
  if (task.title.trim().length < 3) {
    alert("Le titre doit comporter au moins 3 caractères");
    return;
  }
  onTaskCreated(task);
  setTask({ title: "", description: "", priority: 1 });
};


export default TaskForm;
