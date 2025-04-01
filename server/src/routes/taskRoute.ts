import express from 'express';
import { getTasks, createTask, deleteTask, updateTask } from '../controllers/taskController';

const router = express.Router();

// Define the GET route at /api/tasks
router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTask);
router.put("/tasksUpdate/:id", updateTask);

export default router;
