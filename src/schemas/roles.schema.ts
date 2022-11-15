import { Schema } from 'mongoose';

export const RolesSchema = new Schema(
  {
    name: {
      type: String,
      max: 50,
    },
    description: {
      type: String,
      max: 100,
    },
    status: {
      type: Boolean,
      default: true,
    },
    tasks: {
      type: Array,
      default: [],
    },
    users: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);
