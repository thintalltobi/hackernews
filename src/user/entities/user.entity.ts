import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  karma: number;

  @Column()
  about: string;

  @Column()
  deleted: boolean;

  @Column()
  dead: boolean;

  @Column()
  created_at: Date;

  @Column()
  deleted_at: Date;
}
