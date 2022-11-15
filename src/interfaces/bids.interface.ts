import { Document } from 'mongoose';

export interface BidsInterface extends Document {
  id?: string;
  user_id: string;
  price_per_kg:string;
  stock: string;
  quantity: string;
  created_at: Date;
  updated_at: Date;
}
