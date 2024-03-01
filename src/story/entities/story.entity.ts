import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Authors } from '../../author/entities/author.entity';
import { Comments } from '../../comment/entities/comment.entity';

@Entity()
export class Stories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  external_id: number;

  @Column({ nullable: true })
  title: string;

  @Column('text', { nullable: true })
  text: string;

  @Column({ nullable: true })
  score: number;

  @Column({ nullable: true })
  descendant_count: number;

  @Column({ nullable: true })
  dead: boolean;

  @Column()
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

  @OneToMany(() => Comments, (comment) => comment.entityId)
  comment: Comments[];
}
