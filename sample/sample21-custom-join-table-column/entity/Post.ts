import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './Author';
import { ManyToOne } from 'typeorm';
import { Category } from './Category';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';
import { JoinColumn } from 'typeorm';

@Entity('sample21_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => Author, (author) => author.posts, {
    cascade: true,
  })
  @JoinColumn({
    // todo: not yet fixed
    name: 'user',
  })
  author: Author;

  @ManyToMany((type) => Category, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable({
    name: '_post_categories',
  })
  categories: Category[];
}
