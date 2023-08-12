import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { ReviewsModule } from './reviews.module';
import { ProductsController } from 'src/controllers/products.controller';
import { ProductsService } from 'src/services/products.service';
import { BidsModule } from './bids.module';
import { Schemata } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([Schemata.Product, Schemata.Stock]),
    BidsModule,
    ReviewsModule,
    JwtModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
