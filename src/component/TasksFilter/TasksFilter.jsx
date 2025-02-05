import React, { useState } from 'react';
import cls from './TasksFilter.module.css';

const TasksFilter = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div className={cls.buttonsbelike}>
      <form className={[cls.filter_task_form, "bg_color"].join(' ')}>
        <label htmlFor="filter-do">
          <input type="radio" name="filter" id="filter-do" value="do" />
          <div className={cls.filter_value}>Зробити</div>
        </label>

        <label htmlFor="filter-done">
          <input type="radio" name="filter" id="filter-done" value="done" />
          <div className={cls.filter_value}>Зроблено</div>
        </label>

        <label htmlFor="filter-all">
          <input type="radio" name="filter" id="filter-all" value="" />
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
