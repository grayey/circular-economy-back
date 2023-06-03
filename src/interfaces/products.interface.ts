import { Document } from 'mongoose';
import { Entities } from 'src/utils/enums';

export interface ProductsInterface extends Document {
  id?: string;
  name: string;
  slug: string;
  [Entities.Category]: string;
  featuredStock: any;
  keywords?: any;
  stocks?: any;
  packaging: string;
  deliveryOption: string;
  noOfStocks: number;
  searchPath: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
