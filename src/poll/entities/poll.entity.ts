import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Users } from '../../user/entities/user.entity';
import { PollOpt } from '../../poll_opt/entities/poll_opt.entity';
import { Comments } from '../../comment/entities/comment.entity';

@Entity()
export class Poll {
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
  descendant_count: number;

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

  @OneToMany(() => PollOpt, (poll_opt) => poll_opt.poll_id)
  poll_opt: PollOpt[];

  @OneToMany(() => Comments, (Comment) => Comment.entity_id)
  comment: Comment[];
}
