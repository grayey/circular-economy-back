import { Document } from 'mongoose';
import { Entities } from 'src/utils/enums';

export interface ProductsInterface extends Document {
  id?: string;
  name: string;
  slug: string;
  location: string;
  [Entities.User]: string;
  [Entities.Category]: string;
  tags?: any;
  [Entities.Stock]: string[];
  packaging: string;
  deliveryOption: string;
  noOfStocks: number;
  searchPath: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
