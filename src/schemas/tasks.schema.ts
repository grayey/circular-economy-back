import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const TasksSchema = new Schema(
  {
    [Entities.Role]: {
      type: [Schema.Types.ObjectId],
      ref: Entities.Role,
    },
    scope: {
      type: String,
      max: 50,
    },
    path: {
      type: String,
      max: 100,
    },
    identifier: {
      type: String,
      max: 100,
      unique: true,
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
