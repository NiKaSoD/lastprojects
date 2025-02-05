import React from 'react';
import cls from './Tasks.module.css';

const Tasks = ({ tasks, removeTask }) => {
  return (
    <ol className={[cls.tasks, "bg_color"].join(' ')}>
      {tasks.map(task => (
        <li key={task.id}>
          <span>{task.text}</span>
          <button 
            className={cls.deleteButton}
            onClick={() => removeTask(task.id)}
          >
            Удалить
          </button>
        </li>
      ))}
    </ol>
  );
};

export default Tasks;
