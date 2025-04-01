import { useState, useEffect } from "react";
import { Task, TaskStatus } from "../models/TaskModel";

type TaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Task) => void;
  initialData?: Task;
  mode: "create" | "update";
};

export default function TaskModal({ isOpen, onClose, onSubmit, initialData, mode }: TaskModalProps) {
  const [taskName, setTaskName] = useState<string>("");
  const [taskContent, setTaskContent] = useState<string>("");
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.New);

  const formatDateForInput = (dateString: string): string => {
    const date = new Date(dateString);
    const pad = (num: number) => (num < 10 ? "0" + num : num);
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    if (initialData) {
      // Si se pasa initialData (modo actualización), precarga los datos
      setTaskName(initialData.name);
      setTaskContent(initialData.content);
      setStartDate(initialData.startDate ? formatDateForInput(initialData.startDate) : undefined);
      setEndDate(initialData.endDate ? formatDateForInput(initialData.endDate) : undefined);
      setStatus(initialData.status);
    } else {
      // Si no hay initialData (modo creación), reinicia el formulario
      setTaskName("");
      setTaskContent("");
      setStartDate(undefined);
      setEndDate(undefined);
      setStatus(TaskStatus.New);
    }
  }, [initialData, isOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto de recarga de página
    const taskData: Task = {
      taskId: initialData?.taskId || Date.now(), // Usar taskId existente o generar uno nuevo para la creación
      name: taskName,
      content: taskContent,
      startDate,
      endDate,
      status,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(taskData); // Enviar datos de la tarea actualizada o creada
  };

  if (!isOpen) return null; // Si el modal no está abierto, no lo renderiza

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{mode === "create" ? "Create Task" : "Update Task"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">?</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Task Content"
            value={taskContent}
            onChange={(e) => setTaskContent(e.target.value)}
            className="border p-2 rounded"
            required
          />

          <label>Start Date:</label>
          <input
            type="datetime-local"
            value={startDate || ""}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded"
          />

          <label>End Date:</label>
          <input
            type="datetime-local"
            value={endDate || ""}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded"
          />

          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value={TaskStatus.New}>New</option>
            <option value={TaskStatus.InProgress}>In Progress</option>
            <option value={TaskStatus.Done}>Done</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {mode === "create" ? "Create" : "Update"}
          </button>

        </form>
      </div>
    </div>
  );
}
