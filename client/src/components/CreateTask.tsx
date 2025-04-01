import { useState } from 'react';
import { Task, TaskStatus } from '../models/TaskModel';
import TaskModal from './TaskModal'; // Asegúrate de importar el TaskModal correctamente
import { createTask } from '../services/apiService';

interface CreateTaskProps {
  onTaskCreated: (newTask: Task) => void;
}

export default function CreateTask({ onTaskCreated }: CreateTaskProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Task, 'taskId'>>({
    name: '',
    content: '',
    status: TaskStatus.New,
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState<Partial<Omit<Task, 'taskId'>>>({});

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (taskData: Omit<Task, 'taskId'>) => {
    try {
      const newTask = await createTask({
        ...taskData,
        status: Number(taskData.status), // Asegurar que es número
      });

      onTaskCreated(newTask);
      setIsModalOpen(false); // Cerrar el modal después de la creación
      setFormData({
        name: '',
        content: '',
        status: TaskStatus.New,
        startDate: '',
        endDate: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error creating task:', error);
      setErrors({ ...errors, name: 'Failed to create task' });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <button onClick={handleOpenModal} className="btn btn-primary mt-4">
        Open Task Modal
      </button>

      {/* Modal for Task Creation */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
        initialData={{
          taskId: 0, // Default taskId for new tasks
          name: '',
          content: '',
          status: TaskStatus.New,
          startDate: '',
          endDate: ''
        }} // Aquí inicializas con un taskId predeterminado
        mode="create"
      />
    </div>
  );
}
