import { useState, createContext, useMemo, useEffect } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router';
import './App.css';
import './theme/theme.css';
import Header from './component/header/header';
import TasksFilter from './component/TasksFilter/TasksFilter';
import Tasks from './component/tasks/Tasks';
import Footer from './component/footer/Footer';
import ModalCreate from './component/modalCreate/ModalCreate'
import TaskDetail from "./component/taskDetail/TaskDetail.jsx";



export const TasksContext = createContext();

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [filterStatus, setFilterStatus] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  const addTask = (name, description = "", priority = 2, deadline = null) => {
    const now = new Date();
    const nowDate = now.getFullYear()+'-'+ String(now.getMonth()+1).padStart(2, "0")+'-'+now.getDate();

    const newTask = {
      id: Date.now(),
      name,
      description,
      priority,
      created: nowDate,
      deadline,
      done: false
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


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  return (
    <BrowserRouter>
    <TasksContext.Provider value={{ tasks, filteredTasks, isModalOpen,
     addTask, removeTask, doneTask, setFilterStatus, openModal, closeModal}}>
      <Routes>
        <Route path="/" element={<>
          <Header />
          <TasksFilter />
          <Tasks />
          <ModalCreate />
          <Footer /></>} />
        <Route path="/task/:id" element={<>
          <TaskDetail />
          <Footer />
        </>}/>
      </Routes>
    </TasksContext.Provider>
    </BrowserRouter>
  );
}

export default App;
