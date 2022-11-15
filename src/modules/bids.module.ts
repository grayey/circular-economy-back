import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BidsController } from '../controllers/bids.controller';
import { BidsService } from '../services/bids.service';
import { BidsSchema } from '../schemas/bids.schema';
import { StocksSchema } from '../schemas/stocks.schema';
import { SchemaCollections } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([SchemaCollections.Bid, SchemaCollections.Stock]),
  ],
  controllers: [BidsController],
  providers: [BidsService],
})
export class BidsModule {}
