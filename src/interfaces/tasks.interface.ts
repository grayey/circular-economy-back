import { Document } from 'mongoose';

export interface TasksInterface extends Document {
  id?: string;
  path: string;
  name: string;
  method: string;
  moduleName:string;
  createdAt: Date;
  updatedAt: Date;
}
