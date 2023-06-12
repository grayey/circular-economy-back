import { Document } from 'mongoose';
import { BidStages, Entities, RejectionTypes } from 'src/utils/enums';

export interface BidsInterface extends Document {
  id?: string;
  [Entities.Aggregator]: string;
  [Entities.User]: string;
  [Entities.Review]: string;
  [Entities.Stock]: string;
  pricePerKg: string;
  quantity: string;
  holdingTrx: string;
  stage: BidStages;
  rejectionType: RejectionTypes;
  createdAt: Date;
  updatedAt: Date;
}
