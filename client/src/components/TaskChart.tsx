import { Task, TaskStatus } from "../models/TaskModel";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface TaskChartProps {
  tasks: Task[];
}

export default function TaskChart({ tasks }: TaskChartProps) {
  // Contador de tareas por estado
  const statusCounts = {
    [TaskStatus.New]: 0,
    [TaskStatus.InProgress]: 0,
    [TaskStatus.Done]: 0,
  };

  // Llenar los contadores con las tareas
  tasks.forEach(task => {
    statusCounts[task.status] += 1;
  });

  // Etiquetas y valores para el gráfico
  const labels = ["New", "In Progress", "Done"];
  const values = [
    statusCounts[TaskStatus.New], 
    statusCounts[TaskStatus.InProgress], 
    statusCounts[TaskStatus.Done]
  ];

  // Colores personalizables basados en los estados de tarea
  const colors = [
    "#3498db", // New (azul)
    "#f39c12", // In Progress (amarillo)
    "#2ecc71", // Done (verde)
  ];

  // Datos para el gráfico de barras
  const barData = {
    labels,
    datasets: [
      {
        label: "Tasks by Status",
        data: values,
        backgroundColor: colors,
        borderWidth: 1,
        borderRadius: 4, // Bordes redondeados
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Task Status Overview</h3>
      <p className="text-sm text-gray-500 mb-4">Tasks by Status (Total Tasks: {tasks.length})</p>
      <div className="h-64">
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
}