import { Column, Entity } from 'typeorm';
import { BasePost } from './BasePost';
import { PostCategory } from './PostCategory';
import { ManyToMany } from 'typeorm';
import { PostAuthor } from './PostAuthor';
import { ManyToOne } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('sample6_post')
export class Post extends BasePost {
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
