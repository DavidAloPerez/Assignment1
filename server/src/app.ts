import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoute from './routes/taskRoute';
import { connectWithRetry } from './config/db';

// Cargar variables de entorno
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(express.json()); // CORREGIDO: Mover antes de las rutas

app.listen(PORT, () => {
    console.log(`?? Servidor corriendo en el puerto ${PORT}`);
});

// Conectar a la base de datos
connectWithRetry();

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );

// Rutas
app.use('/api', taskRoute);

export default app;
