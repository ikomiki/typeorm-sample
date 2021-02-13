import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './Author';
import { ManyToOne } from 'typeorm';

@Entity('sample25_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => Author, (author) => author.posts)
  author: Author;
}
