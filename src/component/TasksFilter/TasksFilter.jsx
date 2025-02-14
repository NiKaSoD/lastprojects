import React, { useState, useContext, useRef } from 'react';
import cls from './TasksFilter.module.css';
import { TasksContext } from '../../App.jsx';

const TasksFilter = () => {
  const [newTask, setNewTask] = useState("");
  const { addTask, setFilterStatus } = useContext(TasksContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
      inputRef.current?.focus();
    }
  };

  return (
    <div className={cls.buttonsbelike}>
      <form className={[cls.filter_task_form, "bg_color"].join(' ')}>
        <label>
          <input 
            type="radio" 
            name="filter" 
            value="do" 
            onChange={(e) => setFilterStatus(e.target.value)}
          />
          <div className={cls.filter_value}>Зробити</div>
        </label>

        <label>
          <input 
            type="radio" 
            name="filter" 
            value="done" 
            onChange={(e) => setFilterStatus(e.target.value)}
          />
          <div className={cls.filter_value}>Зроблено</div>
        </label>

        <label>
          <input 
            type="radio" 
            name="filter" 
            value="" 
            defaultChecked
            onChange={(e) => setFilterStatus(e.target.value)}
          />
          <div className={cls.filter_value}>Усі</div>
        </label>
      </form>

      <form 
        className={[cls.new_task, "bg_color"].join(' ')} 
        id="new-task-form"
        onSubmit={handleSubmit}
      >
        <input 
          type="text" 
          value={newTask}
          ref={inputRef}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Новая задача"
        />
        <input 
          type="submit" 
          value="Додати нову задачу" 
          id={cls.create_task_button}
        />
      </form>
    </div>
  );
};

export default TasksFilter;
