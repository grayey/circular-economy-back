import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

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
    [Entities.User]: {
      type: [Schema.Types.ObjectId],
      ref: Entities.User,
      default: [],
    },
    [Entities.Aggregator]: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
    [Entities.Task]: {
      type: [Schema.Types.ObjectId],
      ref: Entities.Task,
    },
  },
  { timestamps: true },
);
