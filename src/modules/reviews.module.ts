import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsController } from 'src/controllers/reviews.controller';
import { ReviewsService } from 'src/services/reviews.service';
import { ReviewsSchema } from 'src/schemas/reviews.schema';
import { BidsSchema } from 'src/schemas/bids.schema';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.Bid, Schemata.Review])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
