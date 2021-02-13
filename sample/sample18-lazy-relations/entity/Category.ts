import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Post } from './Post';

@Entity('sample18_category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Post, (post) => post.categories)
  posts: Promise<Post[]>;
}
