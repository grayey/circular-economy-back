import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AggregatorsController } from 'src/controllers/aggregators.controller';
import { AggregatorsService } from 'src/services/aggregators.service';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.User, Schemata.Aggregator])],
  controllers: [AggregatorsController],
  providers: [AggregatorsService],
})
export class AggregatorsModule {}
