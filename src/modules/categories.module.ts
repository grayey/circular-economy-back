import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from 'src/controllers/categories.controller';
import { CategoriesService } from 'src/services/categories.service';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
