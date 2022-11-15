import { Schema } from 'mongoose';

export const ProductsSchema = new Schema(
  {
    name: {
      type: String,
      max: 50,
    },
    slug: {
      type: String,
      max: 100,
    },
    category: {
      type: Schema.Types.Mixed,
    },
    featuredStock: {
      type: Schema.Types.ObjectId,
      ref: 'Stocks',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
    stocks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Stocks',
      },
    ],
    keywords: {
      type: Array,
    },
    packaging: {
      type: String,
      max: 100,
    },

    noOfStocks: {
      type: Number,
      max: 100,
      default: 0,
    },
    deliveryOption: {
      type: String,
      max: 100,
    },
    searchPath: {
      type: String,
      max: 500,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);
