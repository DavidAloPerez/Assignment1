import axios, { AxiosError, AxiosResponse } from "axios";
import { Task } from '../models/TaskModel';

const API_BASE_URL = "http://localhost:5000/api"; // Define the API base URL

const apiClient = axios.create({
    baseURL: "http://localhost:5000/api", // URL del backend
    timeout: 5000, // Tiempo de espera de 5 segundos
});

// Obtener tareas
export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Error fetching tasks');
    return response.json(); // Devuelve array directo
};

// Crear tarea
export const createTask = async (taskData: Omit<Task, 'taskId'>): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
};

// Eliminar tarea
export const deleteTask = async (taskId: number): Promise<void> => {
    console.log(`Deleting task with ID: ${taskId}`); // Depuración
    try {
        await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    } catch (error) {
        console.error('Error details:', error);
        throw error; // Re-lanzar el error para manejarlo en el componente
    }
};

// Actualizar tarea
export const updateTask = async (taskId: number, updatedTaskData: Task): Promise<Task> => {
    try {
        const response: AxiosResponse<Task> = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updatedTaskData);
        return response.data; // Devuelve la tarea actualizada
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error('Error updating task:', error.response?.data);
            throw new Error(error.response?.data || 'Failed to update task');
        }
        throw error;
    }
};
