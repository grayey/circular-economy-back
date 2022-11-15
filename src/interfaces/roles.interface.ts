import { Document } from 'mongoose';


export interface RolesInterface extends Document {
  id?: string;
  name: string;
  description: string;
  status: boolean;
  tasks: any;
  users:any;
  createdAt: Date;
  updatedAt: Date;
}
