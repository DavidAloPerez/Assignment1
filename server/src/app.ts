import express from 'express';
import cors from 'cors';
import taskRoute from './routes/taskRoute'; 

const app = express();

// Define CORS settings
app.use(cors({
    origin: 'http://localhost:5173', // Frontend address
    methods: ['GET', 'POST'], // Allowed HTTP methods
}));

// Add routes
app.use('/api', taskRoute);

export default app;
