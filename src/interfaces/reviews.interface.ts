import { Document } from 'mongoose';


export interface ReviewsInterface extends Document {
  id?: string;
  reviewer: string;
  bid: string;
  comment: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
