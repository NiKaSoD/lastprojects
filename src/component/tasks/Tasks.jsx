import React, { useContext } from 'react';
import { TasksContext } from '../../App.jsx';
import cls from './Tasks.module.css';

const Tasks = () => {
  const { filteredTasks, removeTask, doneTask } = useContext(TasksContext);
  
  return (
    <ol className={[cls.tasks, "bg_color"].join(' ')}>
      {filteredTasks.map(task => (
          <li key={task.id}>
            <span className={task.done ? cls.done : ""}>{task.text}</span>
            <div>
              <button onClick={() => doneTask(task.id)}>
                {task.done ? "Повернути" : "Виконано"}
              </button>
              <button onClick={() => removeTask(task.id)}>Видалити</button>
            </div>
          </li>
        ))}
    </ol>
  );
};

export default Tasks;
