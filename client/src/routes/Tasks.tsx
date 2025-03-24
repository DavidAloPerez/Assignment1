import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { getTasks } from "../services/apiService";
import { Task, TaskStatus } from "../models/TaskModel";
import CreateTask from "../components/CreateTask";

const Tasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleTaskCreated = (newTask: Task) => {
    setTaskList(prevTasks => [newTask, ...prevTasks]);
  };

  const handleDeleteTask = (taskId: number) => {
    console.log("Delete task with ID:", taskId);
  };

  if (loading) return <div className="text-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;
  if (error) return <div className="alert alert-error max-w-md mx-auto mt-8">{error}</div>;

  return (
    <div className="main-content">
      <div className="tasks-container">
        <h1 className="tasks-title">Task Management</h1>
        
        {/* Sección de creación */}
        <div className="task-creation-section mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          <CreateTask onTaskCreated={handleTaskCreated} />
        </div>
        
        {/* Lista de tareas */}
        <div className="task-list-section bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          {taskList.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks found. Create your first task!
            </div>
          ) : (
            <div className="task-list">
              <TaskList tasks={taskList} onDeleteTask={handleDeleteTask} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;