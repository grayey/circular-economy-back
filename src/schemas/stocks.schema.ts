import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const StocksSchema = new Schema(
  {
    [Entities.Aggregator]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    [Entities.Product]: { type: Schema.Types.ObjectId, ref: Entities.Product },

    price: {
      type: Number,
    },

    [Entities.Bid]: [
      { type: Schema.Types.ObjectId, ref: Entities.Bid, default: [] },
    ],

    quantity: {
      type: Number,
    },
    description: {
      type: String,
      max: 500,
    },
    images: {
      type: Array,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
