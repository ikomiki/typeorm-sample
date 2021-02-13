import { Column, Entity } from 'typeorm';
import { BasePost } from './BasePost';
import { ManyToOne } from 'typeorm';
import { PostAuthor } from './PostAuthor';
import { ManyToMany } from 'typeorm';
import { PostCategory } from './PostCategory';
import { JoinTable } from 'typeorm';

@Entity('sample6_blog')
export class Blog extends BasePost {
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
