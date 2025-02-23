import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import { getTasks } from "../services/apiService";

const Tasks = () => {
  const [taskList, setTaskList] = useState<string[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      return [];
    }
  });

  const [newTask, setNewTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTasks()
      .then((data) => {
        setTaskList(Array.isArray(data.tasks) ? data.tasks : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const updatedTasks = [...taskList, newTask];
      setTaskList(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskToDelete: string) => {
    const updatedTasks = taskList.filter((task) => task !== taskToDelete);
    setTaskList(updatedTasks);

    if (updatedTasks.length === 0) {
      localStorage.removeItem("tasks");
    } else {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

  return (
    <div className="w-full p-6 bg-green-50 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-black-800">Tasks</h1>
      <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="flex-grow h-10 px-4 border border-black-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-400 focus:border-green-400"
        />
        <button type="submit" className="btn btn-success">
          Add New Task
        </button>
      </form>
      <TaskList onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default Tasks;