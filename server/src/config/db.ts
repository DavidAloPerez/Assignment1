import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import TaskModel from '../models/taskModel';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,  // ¡Ahora sí encontrará esta variable!
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: console.log,
  }
);

const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('? Database connected successfully');
  } catch (error) {
    console.error('? Database connection failed:', error);
    setTimeout(connectWithRetry, 5000); 
  }
};

export { sequelize, connectWithRetry };
