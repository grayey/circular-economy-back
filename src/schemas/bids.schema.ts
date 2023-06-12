import { Schema } from 'mongoose';
import { BidStages, Entities, RejectionTypes } from 'src/utils/enums';

export const BidsSchema = new Schema(
  {
    [Entities.Aggregator]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    [Entities.User]: {
      //buyer
      type: Schema.Types.ObjectId,
      ref: Entities.User,
    },
    [Entities.Review]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Review,
    },
    [Entities.Stock]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Stock,
    },
    pricePerKg: {
      type: String,
      max: 100,
    },
    quantity: {
      type: String,
    },
    holdingTrx: {
      type: String,
      max: 100,
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
