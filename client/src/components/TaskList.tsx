// client/src/components/TaskList.tsx
import { Task } from "../models/TaskModel";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: number) => void;
}

const TaskList = ({ tasks, onDeleteTask }: TaskListProps) => {
  return (
    <ul className="w-full space-y-3">
      {tasks.map((task) => (
        <li 
          key={task.taskId}
          className="w-full bg-green-50 p-4 rounded-lg border border-green-100 flex justify-between items-center"
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
              <span className={`font-medium ${
                task.status === 1 ? 'text-blue-500' : 
                task.status === 2 ? 'text-amber-500' : 
                'text-green-600'
              }`}>
                {task.status === 1 ? 'New' : 
                 task.status === 2 ? 'In Progress' : 
                 'Completed'}
              </span>
            </div>
          </div>
          
          {/* Botón de eliminar - posición fija a la derecha */}
          <div className="flex-shrink-0 ml-4">
            <button
              onClick={() => onDeleteTask(task.taskId)}
              className="delete-button bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;