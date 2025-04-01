import { useState } from "react";
import { Task } from "../models/TaskModel";
import TaskModal from "./TaskModal"; // Asegúrate de importar el modal

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: number) => void;
  onUpdateTask: (task: Task) => void; // Nuevo método para actualizar la tarea
}

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }: TaskListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Manejo del botón de "Update"
  const handleUpdateClick = (task: Task) => {
    setSelectedTask(task);         // Asigna la tarea seleccionada
    setIsModalOpen(true);          // Abre el modal
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);         // Cierra el modal
    setSelectedTask(null);         // Limpia la tarea seleccionada
  };

  // Manejo de la actualización de la tarea
  const handleSubmit = (updatedTask: Task) => {
    onUpdateTask(updatedTask);  // Asegúrate de que esta función esté actualizando el estado correctamente
    handleCloseModal();         // Cierra el modal después de actualizar
  };

  return (
    <>
      <ul className="w-full space-y-3">
        {tasks.map((task) => (
          <li
            key={task.taskId}
            className={`w-full p-4 rounded-lg border flex justify-between items-center ${
              task.status === 1
                ? "bg-blue-50 border-blue-200"
                : task.status === 2
                ? "bg-yellow-50 border-yellow-200"
                : "bg-green-50 border-green-200"
            }`}
          >
            {/* Contenido de la tarea */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {task.name}
                </h3>
                {task.content && (
                  <span className="text-gray-600 text-sm truncate">
                    - {task.content}
                  </span>
                )}
              </div>

              {/* Metadatos */}
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                {task.startDate && (
                  <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
                )}
                {task.endDate && (
                  <span>End: {new Date(task.endDate).toLocaleDateString()}</span>
                )}
                <span
                  className={`font-medium px-2 py-1 rounded-full text-white ${
                    task.status === 1
                      ? "bg-blue-500"
                      : task.status === 2
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {task.status === 1
                    ? "New"
                    : task.status === 2
                    ? "In Progress"
                    : "Completed"}
                </span>
              </div>
            </div>

            {/* Botones de acción: Eliminar y Actualizar */}
            <div className="flex-shrink-0 ml-4 flex gap-2">
              {/* Botón de eliminar */}
              <button
                onClick={() => onDeleteTask(task.taskId)}
                className="delete-button bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
              >
                Delete
              </button>

              {/* Botón de actualizar */}
              <button
                onClick={() => handleUpdateClick(task)} // Llamada a handleUpdateClick para abrir el modal
                className="update-button bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors"
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal para actualizar */}
      {isModalOpen && selectedTask && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={selectedTask}   // Pasa la tarea seleccionada como datos iniciales
          mode="update"  // Asegura que el modal esté en modo de actualización
        />
      )}
    </>
  );
};

export default TaskList;
