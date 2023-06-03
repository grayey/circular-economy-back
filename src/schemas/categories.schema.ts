import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const CategoriesSchema = new Schema(
  {
    [Entities.Aggregator]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    name: {
      type: String,
      max: 50,
    },
    [Entities.Category]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Category,
      default: new Schema.Types.ObjectId(''), // because it is nullable for a no-parent category
    },
    description: {
      type: String,
      max: 100,
    },
    commission: {
      type: Number,
      max: 100,
    },
    status: {
      type: Boolean,
      default: true,
    },
    ancestors: {
      type: Array,
      default: null,
    },
  },
  { timestamps: true },
);
