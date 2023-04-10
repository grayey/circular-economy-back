import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BidsController } from '../controllers/bids.controller';
import { BidsService } from '../services/bids.service';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.Bid, Schemata.Stock])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
