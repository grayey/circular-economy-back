import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const ProductsSchema = new Schema(
  {
    [Entities.Aggregator]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    name: {
      type: String,
      max: 50,
    },
    location: {
      type: String,
      max: 50,
    },
    slug: {
      type: String,
      max: 100,
    },
    [Entities.Category]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Category,
    },
    [Entities.User]: {
      // seller/owner
      type: Schema.Types.ObjectId,
      ref: Entities.User,
    },
    [Entities.Stock]: [
      {
        type: Schema.Types.ObjectId,
        ref: [Entities.Stock],
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
