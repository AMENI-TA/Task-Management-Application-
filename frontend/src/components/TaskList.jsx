

import React from 'react';

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
*/

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
