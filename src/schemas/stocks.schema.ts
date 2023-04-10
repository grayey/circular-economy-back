import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const StocksSchema = new Schema(
  {
    aggregator: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    product: { type: Schema.Types.ObjectId, ref: Entities.Product },

    price: {
      type: Number,
    },

    bids: [{ type: Schema.Types.ObjectId, ref: Entities.Bid }],

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
