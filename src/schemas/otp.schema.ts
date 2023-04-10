import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';


export const OtpSchema: Schema = new Schema({
  aggregator: {
    type: Schema.Types.ObjectId,
    ref: Entities.Aggregator,
  },
  otp: {
    type: String,
    max: 100,
    unique:true,
    required:true
  },
  expiresBy:{
      type:Date,
      required:true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

