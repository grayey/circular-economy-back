import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from 'src/controllers/tasks.controller';
import { TasksService } from 'src/services/tasks.service';
import { Schemata } from 'src/schemas';

@Module({
  imports: [MongooseModule.forFeature([Schemata.Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
