import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../../user/entities/user.entity';
import { Poll } from '../../poll/entities/poll.entity';

@Entity()
export class PollOpt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  external_id: number;

  @Column()
  poll_id: number;

  @Column()
  text: string;

  @Column()
  score: number;

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

  @OneToMany(() => Poll, (poll) => poll.poll_opt)
  poll: Poll[];
}
