import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from '../controllers/reviews.controller';
import { ReviewsService } from '../services/reviews.service';
import { ReviewsSchema } from '../schemas/reviews.schema';
import { BidsSchema } from '../schemas/bids.schema';



@Module({
  imports:[
    MongooseModule.forFeature([
      { name: "Bids", schema: BidsSchema },
      { name: "Reviews", schema: ReviewsSchema },
      ]),
  ],
  controllers: [ReviewsController, ],
  providers:[ReviewsService, ]
})

export class ReviewsModule {}
