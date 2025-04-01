import dotenv from 'dotenv';
import app from './app';
import { connectWithRetry, sequelize } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = (port: number) => {
    const server = app.listen(port, () => {
        console.log(`? Servidor corriendo en http://localhost:${port}`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
            console.log(`?? Puerto ${port} en uso, probando con ${port + 1}...`);
            startServer(port + 1);
        } else {
            console.error('? Error al iniciar el servidor:', error);
        }
    });
};

// Conectar a la base de datos y luego iniciar el servidor
connectWithRetry().then(() => {
    sequelize.sync({ alter: true }) // Mantener datos existentes
        .then(() => {
            console.log('? Tablas sincronizadas');
            startServer(Number(PORT));
        })
        .catch(error => {
            console.error('? Error sincronizando modelos:', error);
        });
});
