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

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  
};