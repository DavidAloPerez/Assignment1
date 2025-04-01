import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { name, content, startDate, endDate, status } = req.body;

    // create new task
    const newTask = await TaskModel.create({
      name,
      content,
      startDate,
      endDate,
      status,
    });

    res.status(201).json(newTask); //  send 201 = everything ok
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" }); //sedn errs
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, content, startDate, endDate, status } = req.body;
    
    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      res.status(400).json({ message: "Invalid task ID format" });
      return;
    }

    const task = await TaskModel.findByPk(taskId);
    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await task.update({ name, content, startDate, endDate, status });
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Task ID to delete:', id);

    const taskId = parseInt(id, 10);
    if (isNaN(taskId)) {
      console.log('Invalid task ID format');
      res.status(400).json({ message: 'Invalid task ID format' });
      return;
    }

    console.log(`Searching for task with taskId=${taskId}`);
    const task = await TaskModel.findByPk(taskId);
    if (!task) {
      console.log(`Task with ID ${taskId} not found`);
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    await task.destroy();
    console.log(`Task with ID ${taskId} deleted successfully`);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
