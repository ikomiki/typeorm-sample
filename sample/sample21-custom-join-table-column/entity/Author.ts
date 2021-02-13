import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { OneToMany } from 'typeorm';

@Entity('sample21_author')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Post, (post) => post.author, {
    cascade: ['insert', 'update'],
  })
  posts: Post[];
}
