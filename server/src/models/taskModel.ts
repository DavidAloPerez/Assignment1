import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export enum TaskStatusEnum {
  New = 1,
  InProgress = 2,
  Done = 3,
}

interface TaskAttributes {
  taskId?: number;
  name: string;
  content: string;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  status: TaskStatusEnum;
}

class TaskModel extends Model<TaskAttributes> implements TaskAttributes {
  public taskId!: number;
  public name!: string;
  public content!: string;
  public startDate?: Date;
  public endDate?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public status!: TaskStatusEnum;
}

TaskModel.init(
  {
    taskId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: TaskStatusEnum.New, 
      validate: {
        isIn: [[TaskStatusEnum.New, TaskStatusEnum.InProgress, TaskStatusEnum.Done]], 
      },
    },
  },
  {
    sequelize,
    tableName: 'Tasks',
    timestamps: true, 
  }
);

export default TaskModel;
