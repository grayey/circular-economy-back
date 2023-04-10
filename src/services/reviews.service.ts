import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewsInterface } from '../interfaces/reviews.interface';
import { BidsInterface } from '../interfaces/bids.interface';
import { Entities } from 'src/utils/enums';

@Injectable()
export class ReviewsService {
  public dbWork;
  public relations;

  constructor(
    @InjectModel(Entities.Review) private reviewModel: Model<ReviewsInterface>,
    @InjectModel(Entities.Bid) private bidModel: Model<BidsInterface>,
  ) {
    this.relations = { bids: bidModel };
  }

  /**
   *  This method creates a new review
   */
  async createreview() {
    this.dbWork.create();
  }

  async findAll(): Promise<ReviewsInterface[]> {
    return await this.reviewModel.find().populate('reviewer').populate('bid');
  }

  async findReviewByProductId(productId): Promise<ReviewsInterface[]> {
    return await this.reviewModel.find().populate('reviewer').populate('bid');
  }

  async findOne(id: string): Promise<ReviewsInterface> {
    const review = await this.reviewModel.findOne({ _id: id });
    const bids = await this.bidModel.find({ review_id: review._id });
    review['bids'] = bids;
    return review;
  }

  async create(review: ReviewsInterface): Promise<ReviewsInterface> {
    const newReview = new this.reviewModel(review);
    await this.bidModel.updateOne(
      { _id: review.bid },
      { review: newReview._id },
    );
    return await newReview.save();
  }

  async delete(id: string): Promise<ReviewsInterface> {
    return await this.reviewModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    review: ReviewsInterface,
  ): Promise<ReviewsInterface> {
    return await this.reviewModel.findByIdAndUpdate(id, review, {
      new: true,
    });
  }
}
