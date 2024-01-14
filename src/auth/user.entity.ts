import { Role } from 'src/auth/data.types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: true, unique: true, default: null })
  phoneNumber: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false, default: Role.USER })
  role: string;
  @VersionColumn({
    nullable: true,
    default: 1,
  })
  version: number | null;
  @Column({ nullable: false, default: false })
  isDeleted: boolean;
  @CreateDateColumn({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
  })
  createdAt: Date;
  @UpdateDateColumn({
    nullable: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @Column({
    nullable: false,
    default: false,
  })
  emailVerified: boolean;
  @Column({
    nullable: false,
    default: false,
  })
  phoneVerified: boolean;
}
