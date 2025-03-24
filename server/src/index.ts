import express from 'express';
import { connectWithRetry } from './config/db';
import TaskModel from './models/taskModel';
import { sequelize } from './config/db'; // Import sequelize instance
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  };
  
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

// Ruta para obtener todas las tareas
app.get('/api/tasks', async (req, res) => {
    try {
      const tasks = await TaskModel.findAll({
        order: [['createdAt', 'DESC']] // Ordenar por fecha de creación
      });
      res.json(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Error al obtener tareas' });
    }
  });


// Ruta para crear una nueva tarea
app.post('/api/tasks', async (req, res) => {
    try {
      const task = await TaskModel.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Error al crear tarea' });
    }
  });

  const startServer = (port: number) => {
    const server = app.listen(port, () => {
      console.log(`?? Servidor corriendo en http://localhost:${port}`);
    });
  
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`??  Puerto ${port} en uso, probando con ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error('Error al iniciar el servidor:', error);
      }
    });
  };

  // Después de conectar a la DB
connectWithRetry().then(() => {
    sequelize.sync({ alter: true }) // 'alter' actualiza la tabla sin borrar datos
      .then(() => {
        console.log('? Tablas sincronizadas');
        startServer(Number(PORT));
      })
      .catch(error => {
        console.error('Error sincronizando modelos:', error);
      });
  });