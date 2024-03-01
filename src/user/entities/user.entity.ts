import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  karma: number;

  @Column("text",{nullable: true})
  about: string;

  @Column({nullable: true})
  deleted: boolean;

  @Column({nullable: true})
  dead: boolean;

  @Column({nullable: true})
  created_at: Date;

  @Column({nullable: true})
  deleted_at: Date;
}
