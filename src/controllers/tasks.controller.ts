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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TasksService } from 'src/services/tasks.service';
import { TasksInterface } from 'src/interfaces/tasks.interface';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll(): Promise<TasksInterface[]> {
    return this.taskService.createorGetAlltasks();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<TasksInterface> {
    return this.taskService.findOne(id);
  }
}
