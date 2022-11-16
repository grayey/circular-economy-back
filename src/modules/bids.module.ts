import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BidsController } from '../controllers/bids.controller';
import { BidsService } from '../services/bids.service';
import { BidsSchema } from '../schemas/bids.schema';
import { StocksSchema } from '../schemas/stocks.schema';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.Bid, Schemata.Stock])],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
