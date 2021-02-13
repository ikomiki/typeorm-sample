import { Column, Entity } from 'typeorm';
import { PrimaryColumn } from 'typeorm';
import { Generated } from 'typeorm';

@Entity('test01_post')
export class Post {
  @PrimaryColumn('integer')
  @Generated()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ nullable: false })
  likesCount: number;
}
