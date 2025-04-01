import { useState, useEffect } from "react";
import TaskChart from "../components/TaskChart";
import { Task } from "../models/TaskModel";
import { getTasks } from "../services/apiService";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const tasksFromApi = await getTasks();
      setTasks(tasksFromApi);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <div className="text-center p-8"><span className="loading loading-spinner loading-lg"></span></div>;
  }

  if (error) {
    return <div className="alert alert-error max-w-md mx-auto mt-8">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-2">Tasks</h2>
          {/* Aquí podrías añadir una lista de tareas si lo deseas */}
        </div>
        
        <TaskChart tasks={tasks} />
      </div>
    </div>
  );
};

export default Dashboard;