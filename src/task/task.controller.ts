import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private tasksServices: TaskService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.tasksServices.getAllTasks();
  }
  @Post()
  creteTask(@Body() creteTaskDto: CreateTaskDto): Task {
    const task = this.tasksServices.createTask(creteTaskDto);
    console.log(task);
    return task;
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksServices.getTaskById(id);
  }
  @Delete('/:id')
  removeTaskById(@Param('id') id: string): Task[] {
    return this.tasksServices.removeElementById(id);
  }
}
