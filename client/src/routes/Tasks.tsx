// client/src/routes/Tasks.tsx
import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import axios from "axios";
import { getTasks, deleteTask } from "../services/apiService";
import { Task, TaskStatus } from "../models/TaskModel";
import CreateTask from "../components/CreateTask";

const Tasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const fetchTasks = async () => {
    try {
      const tasks = await getTasks();
      const formattedTasks = tasks.map((task: Task) => ({
        ...task,
        status: task.status || TaskStatus.New
      }));
      setTaskList(formattedTasks);
      setError(null);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error instanceof Error ? error.message : "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const handleTaskCreated = (newTask: Task) => {
    setTaskList(prevTasks => [newTask, ...prevTasks]);
    showNotification("Task created successfully", "success");
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      console.log(`Frontend: Intentando eliminar tarea con ID: ${taskId}`);
      await deleteTask(taskId);
      setTaskList(prevTasks => prevTasks.filter(task => task.taskId !== taskId));
      showNotification("Task deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting task:", error);
      showNotification("Error deleting task", "error");
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTaskList(prevTasks =>
      prevTasks.map(task => (task.taskId === updatedTask.taskId ? updatedTask : task))
    );
    showNotification("Task updated successfully", "success");
  };
  
  if (loading) return <div className="text-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="alert alert-error max-w-md mx-auto mt-8">{error}</div>;

  return (
    <div className="main-content">
      {/* Notificación */}
      {notification.show && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          notification.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="tasks-container">
        <h1 className="tasks-title">Task Management</h1>
        
        {/* Sección de creación */}
        <div className="task-creation-section mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          <CreateTask onTaskCreated={handleTaskCreated} />
        </div>
        
        {/* Lista de tareas */}
        <div className="task-list-section bg-white rounded-lg shadow p-6">
          {taskList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks found. Create your first task!
            </div>
          ) : (
            <TaskList tasks={taskList} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
