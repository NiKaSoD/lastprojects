import React, { useContext, memo } from 'react';
import { TasksContext } from '../../App.jsx';
import {Link} from 'react-router';
import cls from './Tasks.module.css';

const TaskItem = memo(({ task, doneTask, removeTask }) => {
  const handleToggle = () => doneTask(task.id);
  const handleRemove = () => removeTask(task.id);

  return (
    <li>
        <Link to={`/task/${task.id}`} className={task.done ? cls.done : ""}>
            {task.name}
        </Link>
      <div>
        <button onClick={handleToggle}>
          {task.done ? "Повернути" : "Виконано"}
        </button>
        <button onClick={handleRemove}>Видалити</button>
      </div>
    </li>
  );
});

const Tasks = () => {
  const { filteredTasks, removeTask, doneTask } = useContext(TasksContext);

  return (
    <ol className={`${cls.tasks} bg_color`}>
      {filteredTasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          doneTask={doneTask} 
          removeTask={removeTask} 
        />
      ))}
    </ol>
  );
};

export default Tasks;
