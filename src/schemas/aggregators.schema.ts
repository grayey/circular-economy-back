import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const AggregatorsSchema = new Schema(
  {
    name: {
      type: String,
      max: 50,
    },
    websiteUrl: {
      type: String,
      max: 255,
    },
    contactEmail: {
      type: String,
      max: 255,
    },
    logo: {
      type: String,
      max: 255,
    },
    aggregatorCode: {
      type: String,
      max: 255,
    },
    status: {
      type: Boolean,
      default: true,
    },
    [Entities.User]: {
      type: [Schema.Types.ObjectId],
      ref: Entities.User,
    },
    isSuper: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
