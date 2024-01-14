import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private tasksServices: TaskService) {}
  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksServices.getAllTasks();
  }
  @Post()
  creteTask(@Body() creteTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksServices.creteNewTask(creteTaskDto);
    console.log(task);
    return task;
  }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksServices.getTaskByID(id);
  }
  @Delete('/:id')
  removeTaskById(@Param('id') id: string): Promise<void> {
    return this.tasksServices.deleteTaskByID(id);
  }
}
