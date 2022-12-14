import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from 'src/controllers/products.controller';
import { ProductsService } from 'src/services/products.service';
import { BidsModule } from './bids.module';
import { ReviewsModule } from './reviews.module';
import { Schemata } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([Schemata.Product, Schemata.Stock]),
    BidsModule,
    ReviewsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
