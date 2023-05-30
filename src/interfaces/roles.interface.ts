import { Document } from 'mongoose';
import { Entities } from 'src/utils/enums';


export interface RolesInterface extends Document {
  id?: string;
  name: string;
  description: string;
  status: boolean;
  [Entities.Task]: Array<string>;
  users:any;
  createdAt: Date;
  updatedAt: Date;
}
