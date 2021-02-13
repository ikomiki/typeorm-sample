import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { ManyToMany } from 'typeorm';

@Entity('sample5_post_category')
export class PostCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Post, (post) => post.categories, {
    cascade: ['insert', 'update'], // ✕true （Relation PostCategory#posts and Post#categories both has cascade remove set. This）
  })
  posts: Post[];
}
