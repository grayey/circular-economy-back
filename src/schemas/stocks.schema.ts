import { Schema } from 'mongoose';

export const StocksSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Products' },

    price: {
      type: Number,
    },

    bids: [{ type: Schema.Types.ObjectId, ref: 'Bids' }],

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
