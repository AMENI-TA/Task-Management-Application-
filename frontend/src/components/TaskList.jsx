


/*const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
        </li>
      ))}
    </ul>
  );
};


const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => onUpdateTask(task)}>Modifier</button>
          <button onClick={() => onDeleteTask(task._id)}>Supprimer</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
*/

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  if (!Array.isArray(tasks)) {
    return <p>Erreur : la liste des tâches est invalide.</p>;
  }

  if (tasks.length === 0) {
    return (
      <div>
        <p>Aucune tâche à afficher.</p>
        <button onClick={() => onUpdateTask({})}>Ajouter une tâche</button>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
