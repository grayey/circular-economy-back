import { Schema } from 'mongoose';
import { Entities } from 'src/utils/enums';

export const ReviewsSchema = new Schema({
  //there's just one review per bid
  aggregator: {
    type: Schema.Types.ObjectId,
    ref: Entities.Aggregator,
  },
  reviewer: {
    type: Schema.Types.ObjectId,
    ref:Entities.User,
  },
  bid: {
    type: Schema.Types.ObjectId,
    ref:Entities.Bid,
  },
  comment: {
      type: String
  },
  rating: {
      type: Number,
  },

}, { timestamps: true});
