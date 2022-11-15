import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TasksInterface } from 'src/interfaces/tasks.interface';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Tasks') private taskModel: Model<TasksInterface>) {}

  /**
   *  This method creates or gets all system tasks task
   */
  async createorGetAlltasks() {
    let allTasks = await this.taskModel.find();
    if (!allTasks.length) {
      const appRoutes = {}; // routes config
      for (const key in appRoutes) {
        appRoutes[key].forEach(async (route) => {
          const task: TasksInterface = {
            ...route,
            module_name: key,
          };
          const newTask = new this.taskModel(task);
          await newTask.save();
        });
      }
    }
    return await this.findAll();
  }

  async findAll(): Promise<TasksInterface[]> {
    return await this.taskModel.find();
  }

  async findOne(id: string): Promise<TasksInterface> {
    return await this.taskModel.findOne({ _id: id });
  }
}
