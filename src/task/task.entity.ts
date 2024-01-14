import { TaskStatus } from 'src/task/task.model';
import { Column, Entity, PrimaryGeneratedColumn, VersionColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
  @VersionColumn({
    nullable: true,
    default: 1,
  })
  version: number | null;
}
