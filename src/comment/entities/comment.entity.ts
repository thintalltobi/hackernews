import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Users } from '../../user/entities/user.entity';
import { Stories } from '../../story/entities/story.entity';
import { Poll } from '../../poll/entities/poll.entity';
import { EntityType } from 'src/hackernews_cron/dto/create-hackernews_cron.dto';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  external_id: number;

  @Column()
  text: string;

  @Column()
  parent_comment_id: number;

  @Column()
  entity_id: number;

  @Column()
  created_by_id: number;

  @Column()
  created_at: Date;

  @Column()
  deleted_at: Date;

//   @OneToOne(() => Users)
//   @JoinColumn()
//   created2_by: Users;

  // @ManyToOne(() => Stories, (stories) => stories.comment)
  // stories: Stories[]

  // @ManyToOne(() => Poll, (polls) => polls.comment)
  // polls: Poll[]
}
