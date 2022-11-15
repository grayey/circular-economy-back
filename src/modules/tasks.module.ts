import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TasksController } from '../controllers/tasks.controller';
import { TasksService} from '../services/tasks.service';
import { TasksSchema} from '../schemas/tasks.schema';



@Module({
  imports:[
    MongooseModule.forFeature([
      { name: "Tasks", schema: TasksSchema },
    ]),
  ],
  controllers: [ TasksController, ],
  providers:[ TasksService ],
})

export class TasksModule {}
