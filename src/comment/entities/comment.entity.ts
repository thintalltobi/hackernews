import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Authors } from '../../author/entities/author.entity';
import { Stories } from '../../story/entities/story.entity';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  external_id: number;

  @Column('text', { nullable: true })
  text: string;

  @Column({ nullable: true })
  parent_comment_id: number;

  @Column({ nullable: true })
  entityId: number;

  @Column({ nullable: true })
  createdById: number;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  deleted_at: Date;

  @OneToOne(() => Authors, {
    eager: true,
  })
  @JoinColumn()
  createdBy: Authors;

  @JoinColumn()
  @ManyToOne(() => Stories, (stories) => stories.comment, {
    eager: true,
  })
  entity: Stories[];
}
