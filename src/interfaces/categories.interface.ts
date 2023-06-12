import { Document } from 'mongoose';
import { Entities } from 'src/utils/enums';

export interface CategoriesInterface extends Document {
  id?: string;
  [Entities.Category]?: string;
  name: string;
  description: string;
  ancestors:any;
  commission:number;
  status: boolean;
}
