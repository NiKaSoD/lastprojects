import { useState, useContext, createContext, useMemo } from 'react';
import './App.css';
import './theme/theme.css';
import Header from './component/header/header';
import TasksFilter from './component/TasksFilter/TasksFilter';
import Tasks from './component/tasks/Tasks';
import Footer from './component/footer/Footer';

export const TasksContext = createContext();

function App() {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");

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

  const doneTask = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    if (filterStatus === "do") return tasks.filter(task => !task.done);
    if (filterStatus === "done") return tasks.filter(task => task.done);
    return tasks;
  }, [tasks, filterStatus]);

  return (
    <TasksContext.Provider value={{ tasks, filteredTasks, addTask, removeTask, doneTask, setFilterStatus }}>
      <Header />
      <TasksFilter />
      <Tasks />
      <Footer />
    </TasksContext.Provider>
  );
}

export default App;
