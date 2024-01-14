import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.model';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from 'src/task/task.entity';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }
  async getTaskByID(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id,
      },
      lock: { mode: 'optimistic', version: 1 },
    });
    if (!found) throw new NotFoundException('Task not found');
    return found;
  }
  async creteNewTask(creteTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = creteTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });
    await this.taskRepository.save(task);
    return task;
  }
  async deleteTaskByID(id: string): Promise<void> {
    const task = await this.taskRepository.delete({ id });
    if (task.affected === 0) throw new NotFoundException('No task to delete');
  }
}
