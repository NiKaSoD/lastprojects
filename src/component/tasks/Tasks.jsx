import React, { useContext } from 'react';
import { TasksContext } from '../../App.jsx';
import cls from './Tasks.module.css';

const Tasks = () => {
  const { tasks, removeTask } = useContext(TasksContext);
  
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
