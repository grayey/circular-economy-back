import { Document } from 'mongoose';

export interface AggregatorsInterface extends Document {
  id?: string;
  name: string;
  websiteUrl: string;
  contactEmail: string;
  logo: string;
  status: boolean;
  users: any;
  createdAt: Date;
  updatedAt: Date;
}
