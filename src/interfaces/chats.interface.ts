import { Document } from 'mongoose';


export interface ChatsInterface extends Document {
  id?: string;
  name: string;
  description: string;
  status: boolean;
  tasks: any;
  users:any;
  created_at: Date;
  updated_at: Date;
}
