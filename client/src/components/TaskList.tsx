import { useEffect, useState } from "react";

interface TaskListProps {
  onDeleteTask: (task: string) => void;
}

const TaskList = ({ onDeleteTask }: TaskListProps) => {
  const [taskList, setTaskList] = useState<string[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/tasks");
        const data = await response.json();
        setTaskList(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    getTasks();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <ul>
        {taskList.map((task, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 mb-2 rounded flex justify-between items-center"
          >
            <span>{task}</span>
            <button
              className="bg-red-600 border-2 border-black text-white px-4 py-2 rounded transition-transform transform hover:bg-red-800 hover:scale-105"
              onClick={() => onDeleteTask(task)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;