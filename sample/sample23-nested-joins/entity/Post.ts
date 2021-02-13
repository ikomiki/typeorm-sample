import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './Category';
import { Author } from './Author';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';
import { ManyToOne } from 'typeorm';

@Entity('sample23_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany((type) => Category, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @ManyToOne((type) => Author, { cascade: ['insert'] })
  author: Author | null;
}
