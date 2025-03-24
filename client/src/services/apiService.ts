import axios, { AxiosError, AxiosResponse } from "axios";
import { Task } from '../models/TaskModel';

const API_BASE_URL = "http://localhost:5000/api"; // Define the API base URL

const apiClient = axios.create({
    baseURL: "http://localhost:5000/api", // URL del backend
    timeout: 5000, // Tiempo de espera de 5 segundos
});

export const getTasks = async (): Promise<Task[]> => {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) throw new Error('Error fetching tasks');
    return response.json(); // Devuelve array directo
  };

  export const createTask = async (taskData: Omit<Task, 'taskId'>): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/tasks`, taskData);
    return response.data;
  };
