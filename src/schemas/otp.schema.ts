import { Schema } from 'mongoose';


export const OtpSchema: Schema = new Schema({
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

