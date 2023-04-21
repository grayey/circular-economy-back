import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from 'src/services/tasks.service';
import { TasksInterface } from 'src/interfaces/tasks.interface';

@ApiTags('Tasks')
@Controller('task')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  createSystemTasks(): Promise<{ results: TasksInterface[]; count: number }> {
    return this.taskService.createSystemTasks();
  }

  @Get()
  async getSystemTasks(
    @Query() { q, skip, limit, paginate = true, include },
  ): Promise<{ results: TasksInterface[]; count: number }> {
    return await this.taskService.findAll(q, {
      skip,
      limit,
      paginate,
      populate: include,
    });
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<TasksInterface> {
    return this.taskService.findOne(id);
  }
}
