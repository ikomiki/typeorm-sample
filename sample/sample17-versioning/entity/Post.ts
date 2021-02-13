import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { VersionColumn } from 'typeorm';

@Entity('sample17_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @VersionColumn()
  version: number;
}
