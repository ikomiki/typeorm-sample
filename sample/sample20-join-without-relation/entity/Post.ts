import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './Author';
import { Category } from './Category';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('sample20_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column('int')
  authorId: number;

  @ManyToMany((type) => Category)
  @JoinTable()
  categories: Category[];

  superCategories: Category[];

  author: Author;
}
