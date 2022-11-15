import { Schema } from 'mongoose';

export const TasksSchema = new Schema(
  {
    name: {
      type: String,
      max: 50,
    },
    path: {
      type: String,
      max: 100,
    },
    method: {
      type: String,
      default: 100,
    },

    moduleName: {
      type: String,
      default: 100,
    },
  },
  { timestamps: true },
);
