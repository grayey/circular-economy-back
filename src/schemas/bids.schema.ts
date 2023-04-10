import { Schema } from 'mongoose';
import { BidStages, Entities, RejectionTypes } from 'src/utils/enums';

export const BidsSchema = new Schema(
  {
    aggregator: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: 'Reviews',
    },
    pricePerKg: {
      type: String,
      max: 100,
    },
    holdingTrx: {
      type: String,
      max: 100,
    },
    stock: {
      type: Schema.Types.ObjectId,
      ref: 'Stocks',
    },
    quantity: {
      type: Number,
    },
    stage: {
      type: String,
      enum: Object.values(BidStages),
      default: BidStages.BID_INIT,
    },
    rejectionType: {
      type: String,
      enum: Object.values(RejectionTypes),
      default: RejectionTypes.NONE,
    },
  },
  { timestamps: true },
);
