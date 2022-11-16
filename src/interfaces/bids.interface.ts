import { Document } from 'mongoose';

export interface BidsInterface extends Document {
  id?: string;
  userId: string;
  pricePerKg:string;
  stock: string;
  quantity: string;
  createdAt: Date;
  updatedAt: Date;
}
