import React, { useState } from 'react';

const App = () => {
  // Estado para las tareas y para el input de nueva tarea
  const [taskList, setTaskList] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  // Función para manejar el submit del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if (newTask.trim() !== '') {
      // Agregar la nueva tarea a la lista
      setTaskList([...taskList, newTask]);
      // Limpiar el campo de input después de añadir la tarea
      setNewTask('');
    }
  };

  // Función para eliminar una tarea
  const deleteTask = (taskToDelete: string) => {
    // Filtramos las tareas, eliminando la que coincide con la tarea que se quiere eliminar
    const updatedTaskList = taskList.filter(task => task !== taskToDelete);
    setTaskList(updatedTaskList); // Actualizamos el estado con la lista filtrada
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-title">WhatToDoApp</h1>
      </header>
      
      <form className="mt-5 flex gap-2" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={newTask} // Asocia el valor del input al estado
          onChange={(e) => setNewTask(e.target.value)} // Actualiza el estado cuando el input cambia
          placeholder="New task" 
          className="border p-2 w-full rounded" 
        />
        <button 
          type="submit" 
          className="bg-green-500 text-white p-2 rounded"
        >
          Add new task
        </button>
      </form>

      <ul className="mt-5 list-disc pl-5" style={{ marginLeft: '5%' }}>
        {/* Renderiza las tareas añadidas */}
        {taskList.map((task, index) => (
          <li key={index} style={{ listStyleType: 'circle' }}>
            {task}
            <button 
              onClick={() => deleteTask(task)} 
              className="delete-button ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;





/* Different ways to implement react components/functions
  function App() {}
  const App = () => {}
  export default function App() {}
*/
