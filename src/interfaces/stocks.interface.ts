import { Document } from 'mongoose';

export interface StocksInterface extends Document {
  quantity:number;
  price:number;
  description:string;
  images:any;
  bids:any[];
  productId:string;
  isFeatured: boolean;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
