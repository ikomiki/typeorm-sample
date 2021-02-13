import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { ManyToMany } from 'typeorm';

@Entity('sample6_post_category')
export class PostCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Post, (post) => post.categories, {
    cascade: ['insert', 'update'],
  })
  posts: Post[];
}
