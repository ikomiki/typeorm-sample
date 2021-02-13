import { Column, Entity } from 'typeorm';
import { PostCategory } from './PostCategory';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';
import { BaseObject } from './BaseObject';

@Entity('sample13_post')
export class Post extends BaseObject {
  @Column()
  text: string;

  @ManyToMany((type) => PostCategory, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  categories: PostCategory[];
}
