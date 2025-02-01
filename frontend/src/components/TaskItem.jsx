
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

 /* import React from "react";

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
*/

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la tâche "${task.title}" ?`)) {
      onDeleteTask(task._id);
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 1:
        return "Faible";
      case 2:
        return "Moyenne";
      case 3:
        return "Élevée";
      default:
        return "Non définie";
    }
  };

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priorité : {getPriorityLabel(task.priority)}</p>
      <button onClick={() => onUpdateTask(task)}>Modifier</button>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
};

export default TaskItem;
