import { Document } from 'mongoose';
import { Entities } from 'src/utils/enums';

export interface StocksInterface extends Document {
  quantity: number;
  price: number;
  location?: string;
  [Entities.Product]: string;
  description: string;
  images: string[];
  [Entities.Bid]: string[];
  productId: string;
  isFeatured: boolean;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
