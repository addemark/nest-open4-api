import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  private task: Task[] = [];
  getAllTasks(): Task[] {
    return this.task;
  }
  createTask(creteTaskDto: CreateTaskDto): Task {
    const { title, description } = creteTaskDto;
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };
    this.task.push(task);
    return task;
  }
  getTaskById(id: string): Task {
    console.log(this.task);
    const data = this.task.find((task) => task.id === id);
    if (!data) throw new NotFoundException();
    return data;
  }
  removeElementById(id: string): Task[] {
    return this.task.filter((task, index) => task.id !== id);
  }
}
