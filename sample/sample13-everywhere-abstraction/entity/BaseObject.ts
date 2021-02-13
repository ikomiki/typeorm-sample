import { Column } from 'typeorm';
import { BasePost } from './BasePost';
import { PostAuthor } from './PostAuthor';
import { ManyToOne } from 'typeorm';
import { PrimaryColumn } from 'typeorm';
import { Generated } from 'typeorm';

export class BaseObject extends BasePost {
  @PrimaryColumn('double')
  @Generated()
  id: number;

  @Column()
  title: string;

  @ManyToOne((type) => PostAuthor, (post) => post.posts, {
    cascade: true,
  })
  author: PostAuthor;
}
