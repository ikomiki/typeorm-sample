import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { JoinTable } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Author } from './Author';
import { Category } from './Category';

@Entity('sample31_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => Author, {
    cascade: ['insert'],
  })
  author: Author;

  @ManyToMany((type) => Category, {
    cascade: ['insert'],
  })
  @JoinTable()
  categories: Category[];
}
