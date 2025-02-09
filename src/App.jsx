import { useState, useContext, createContext } from 'react';
import './App.css';
import './theme/theme.css';
import Header from './component/header/header';
import TasksFilter from './component/TasksFilter/TasksFilter';
import Tasks from './component/tasks/Tasks';
import Footer from './component/footer/Footer';

export const TasksContext = createContext();


function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const removeTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <TasksContext.Provider value={{tasks, addTask, removeTask}}>
      <Header />
      <TasksFilter/>
      <Tasks />
      <Footer />
    </TasksContext.Provider>
  );
}

export default App;
