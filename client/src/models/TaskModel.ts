export interface Task {
  taskId: number;
  name: string;
  content: string;
  status: TaskStatus;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum TaskStatus {
  New = 1,
  InProgress = 2,
  Done = 3
}