import { Document } from 'mongoose';

export interface ProductsInterface extends Document {
  id?: string;
  name: string;
  slug: string;
  category: any;
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
