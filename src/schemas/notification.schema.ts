import { Schema } from 'mongoose';

export const NotificationSchema: Schema = new Schema({
  message: {
    type: String,
    required:true
  },
  from:{
      type:String,
      required:true,
  },
  entity: {
    type: String,
  },
}, { timestamps: true });

