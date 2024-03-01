import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn,
    Timestamp,
  } from 'typeorm';

  import { Users } from '../../user/entities/user.entity'
  import { Comments } from '../../comment/entities/comment.entity'

  @Entity()
  export class Stories {
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
    dead: boolean;
    
    @Column()
    created_by_id: number;

    @Column()
    created_at: Date;

    @Column()
    deleted_at: Date;

    // @OneToOne(() => Users)
    // @JoinColumn()
    // created_by: Users 

    @OneToMany(() => Comments, (Comment) => Comment.entity_id)
    comment: Comment[]
  }