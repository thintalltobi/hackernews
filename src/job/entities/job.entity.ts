import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../user/entities/user.entity';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  external_id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  score: number;

  @Column()
  url: string;

  @Column()
  deleted: boolean;

  @Column()
  dead: boolean;

  @Column()
  created_at: Date;

  @Column()
  deleted_at: Date;

  @OneToOne(() => Users)
  @JoinColumn()
  created_by: Users;
}
