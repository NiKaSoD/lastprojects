import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { TasksContext } from '../../App';
import cls from './TaskDetail.module.css';


const TaskDetail = () => {
    const { id } = useParams();
    const { tasks } = useContext(TasksContext);
    const task = tasks.find(task => task.id === Number(id));

    if (!task) {
        return <div>Задача не найдена</div>;
    }

    return (
        <div className={cls.container}>
            <div className={cls.content}>
                <h2>{task.name}</h2>
                <p><strong>Опис:</strong> {task.description}</p>
                <p><strong>Пріоритет:</strong> {task.priority}</p>
                <p><strong>Створено:</strong> {task.created}</p>
                <p><strong>Дедлайн:</strong> {task.deadline || "Отсутствует"}</p>
                <p><strong>Статус:</strong> {task.done ? "Выполнена" : "Не выполнена"}</p>
            </div>
        </div>

    );
};

export default TaskDetail;
