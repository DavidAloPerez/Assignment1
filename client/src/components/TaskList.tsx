interface TaskListProps {
    taskList: string[];
    onDeleteTask: (task: string) => void;
  }
  
  const TaskList = ({ taskList, onDeleteTask }: TaskListProps) => {
    return (
      <ul>
        {taskList.map(task => (
          <li key={task}>
            {task} <button onClick={() => onDeleteTask(task)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  
  export default TaskList;
  