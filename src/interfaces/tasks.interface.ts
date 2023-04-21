import { Document } from 'mongoose';

export interface TasksInterface extends Document {
  _id?: string;
  path: string;
  method: string;
  moduleName?: string;
  scope?: string;
  identifier?:string;
  createdAt: string;
  updatedAt: string;
}
