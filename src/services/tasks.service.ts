import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TasksInterface } from 'src/interfaces/tasks.interface';
import { Entities } from 'src/utils/enums';
import {
  formatApplicationTasks,
  getApplicationRoutes,
} from 'src/utils/helpers';
import { Pagination } from 'src/interfaces/pagination.interface';
import { SearchService } from './search.service';

@Injectable()
export class TasksService extends SearchService {
  constructor(
    @InjectModel(Entities.Task) private taskModel: Model<TasksInterface>,
  ) {
    super(taskModel);
  }

 /**
  * This method creates system tasks
  * @returns 
  */
  async createSystemTasks() {
    let allTasks = await this.taskModel.find();
    const appRoutes = await getApplicationRoutes();
    const applicationTasks: Array<TasksInterface> =
      formatApplicationTasks(appRoutes);
    const existingTasksIds = allTasks.map(({ identifier }) => identifier);
    const newTasks = applicationTasks.filter(
      ({ identifier }) => !existingTasksIds.includes(identifier),
    );
    if (newTasks.length) {
      await this.taskModel.insertMany(newTasks);
    }

    return await this.find({});
  }

  public async find(
    lookFor,
  ): Promise<{ results: TasksInterface[]; count: number }> {
    const results: TasksInterface[] = await this.taskModel.find(lookFor); // don't populate [Entities.Role]
    const count = await this.taskModel.count();
    return {
      results,
      count,
    };
  }

  public async findAll(
    searchTerm: string,
    pagination: Pagination,
    lookFor?: any,
  ): Promise<{ results: TasksInterface[]; count: number }> {
    if (!pagination.paginate) {
      return this.find(lookFor);
    }
    return await this.paginate(searchTerm, pagination);
  }

  async findOne(id: string): Promise<TasksInterface> {
    return await this.taskModel.findOne({ _id: id });
  }
}
