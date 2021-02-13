import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostCategory } from './PostCategory';
import { PostAuthor } from './PostAuthor';
import { ManyToOne } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('sample7_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => PostAuthor, (post) => post.posts, {
    cascade: true,
  })
  author: PostAuthor;

  @ManyToMany((type) => PostCategory, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  categories: PostCategory[];
}
