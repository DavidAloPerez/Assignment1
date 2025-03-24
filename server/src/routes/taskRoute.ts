import express from 'express';
import { getTasks } from '../controllers/taskController';

const router = express.Router();

// Define the GET route at /api/tasks
router.get('/tasks', getTasks);
router.post('/tasks', getTasks);

export default router;
