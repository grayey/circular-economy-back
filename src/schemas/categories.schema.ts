import { Schema } from 'mongoose';

export const CategoriesSchema = new Schema(
  {
    name: {
      type: String,
      max: 50,
    },
    parentId: {
      type: String,
      max: 255,
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
