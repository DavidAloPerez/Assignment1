// client/src/components/CreateTask.tsx
import { useState } from 'react';
import { createTask } from '../services/apiService';
import { Task, TaskStatus } from '../models/TaskModel';

interface CreateTaskProps {
  onTaskCreated: (newTask: Task) => void;
}

export default function CreateTask({ onTaskCreated }: CreateTaskProps) {
  const [formData, setFormData] = useState<Omit<Task, 'taskId'>>({
    name: '',
    content: '',
    status: TaskStatus.New, // Valor por defecto (1)
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState<Partial<Omit<Task, 'taskId'>>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    const newErrors: Partial<Omit<Task, 'taskId'>> = {};
    if (!formData.name.trim()) newErrors.name = 'Task name is required';
    if (!formData.content.trim()) newErrors.content = 'Description is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const newTask = await createTask({
        ...formData,
        status: Number(formData.status) // Asegurar que es número
      });
      
      onTaskCreated(newTask);
      // Reset form manteniendo el status por defecto
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error cuando se edita
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* Task Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Task Name*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
              required
            />
            {errors.name && (
              <span className="text-error text-sm mt-1">{errors.name}</span>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className={`textarea textarea-bordered h-24 ${errors.content ? 'textarea-error' : ''}`}
              required
            />
            {errors.content && (
              <span className="text-error text-sm mt-1">{errors.content}</span>
            )}
          </div>

          {/* Status Selector */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value={TaskStatus.New}>New</option>
              <option value={TaskStatus.InProgress}>In Progress</option>
              <option value={TaskStatus.Done}>Done</option>
            </select>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Start Date</span>
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">End Date</span>
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="input input-bordered"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}