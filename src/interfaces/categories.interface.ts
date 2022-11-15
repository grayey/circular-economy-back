import { Document } from 'mongoose';

export interface CategoriesInterface extends Document {
  id?: string;
  parentId?: string;
  name: string;
  description: string;
  ancestors:any;
  commission:number;
  status: boolean;
}
