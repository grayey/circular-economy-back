import { Schema } from 'mongoose';

export const ReviewsSchema = new Schema({
  //there's just one review per bid

  reviewer: {
    type: Schema.Types.ObjectId,
    ref:'Users',
  },
  bid: {
    type: Schema.Types.ObjectId,
    ref:'Bids',
  },
  comment: {
      type: String
  },
  rating: {
      type: Number,
  },

}, { timestamps: true});
