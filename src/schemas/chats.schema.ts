import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const ChatsSchema = new Schema(
  {
    aggregator: {
      type: Schema.Types.ObjectId,
      ref: Entities.Aggregator,
    },
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
