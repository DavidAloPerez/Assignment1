import axios, { AxiosError, AxiosResponse } from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5001/api", // URL del backend
    timeout: 5000, // Tiempo de espera de 5 segundos
});

export async function getTasks() {
    try {
        const response: AxiosResponse = await apiClient.get("/tasks");
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        throw new Error(`Error fetching tasks: ${err.response?.data}`);
    }
}
