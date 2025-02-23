import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import { TasksContext } from '../../App.jsx';
import styles from './ModalCreate.module.css';

const ModalCreate = () => {
  const { isModalOpen, closeModal, addTask } = useContext(TasksContext);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      priority: 2,
      deadline: '',
    },
  });

  if (!isModalOpen) return null;

  const onSubmit = (data) => {
    addTask(data.name, data.description, Number(data.priority), data.deadline || null);
    reset();
    closeModal();
  };

  const modalContent = (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Назва задачі</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'we need this' })}
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Опис задачі</label>
            <textarea id="description" {...register('description')}></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="priority">Пріоритет задачі</label>
            <select id="priority" {...register('priority')}>
              <option value={1}>Высокий</option>
              <option value={2}>Средний</option>
              <option value={3}>Низкий</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="deadline">Срок виконання задачі</label>
            <input id="deadline" type="date" {...register('deadline')} />
          </div>
          <div>
            <button type="submit" className={styles.submitButton}>
                Додати задачу
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'));
};

export default ModalCreate;
