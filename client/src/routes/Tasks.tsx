import TaskList from '../components/TaskList.tsx';
import { useState } from 'react';

const Tasks = () => {
  const [taskList, setTaskList] = useState<string[]>(["Task 1", "Task 2", "Task 3"]);

  const handleDeleteTask = (task: string) => {
    setTaskList(taskList.filter(t => t !== task));
  };

  return (
    <div>
      <h2>Tasks</h2>
      <TaskList taskList={taskList} onDeleteTask={handleDeleteTask} />
    </div>
  );
};

export default Tasks;
