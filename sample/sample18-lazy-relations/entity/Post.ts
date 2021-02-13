import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './Author';
import { ManyToOne } from 'typeorm';
import { Category } from './Category';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('sample18_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => Author, (author) => author.posts, {
    cascade: ['insert'],
    onDelete: 'SET NULL',
  })
  author: Promise<Author | null>;

  @ManyToMany((type) => Category, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  categories: Promise<Category[]>;
}
