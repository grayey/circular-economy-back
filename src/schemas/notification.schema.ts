import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const NotificationSchema: Schema = new Schema({
  aggregator: {
    type: Schema.Types.ObjectId,
    ref: Entities.Aggregator,
  },
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

