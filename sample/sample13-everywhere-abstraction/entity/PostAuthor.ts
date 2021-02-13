import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { OneToMany } from 'typeorm';
import { PostUser } from './PostUser';

@Entity('sample13_post_author')
export class PostAuthor extends PostUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];
}
