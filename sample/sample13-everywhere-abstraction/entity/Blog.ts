import { Column, Entity } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { PostCategory } from './PostCategory';
import { JoinTable } from 'typeorm';
import { BaseObject } from './BaseObject';

@Entity('sample13_blog')
export class Blog extends BaseObject {
  @Column()
  text: string;

  @ManyToMany((type) => PostCategory, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  categories: PostCategory[];
}
