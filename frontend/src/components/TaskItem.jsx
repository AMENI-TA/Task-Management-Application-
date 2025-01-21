
/*const TaskFilters = ({ onFilterChange, onSortChange }) => {
    return (
      <div>
        <select onChange={(e) => onFilterChange(e.target.value)}>
          <option value="">Tous</option>
          <option value="pending">En attente</option>
          <option value="completed">Terminée</option>
        </select>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="">Sans tri</option>
          <option value="deadline">Par date limite</option>
          <option value="priority">Par priorité</option>
        </select>
      </div>
    );
  };
  
  export default TaskFilters;
  */

  import React from "react";

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priorité : {["Faible", "Moyenne", "Élevée"][task.priority - 1]}</p>
      <button onClick={() => onUpdateTask(task)}>Modifier</button>
      <button onClick={() => onDeleteTask(task._id)}>Supprimer</button>
    </div>
  );
};

export default TaskItem;
