import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToMany } from 'typeorm';
import { Category } from './Category';
import { JoinTable } from 'typeorm';

@Entity('sample30_post', {
  orderBy: {
    title: 'ASC',
    id: 'DESC',
  },
})
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany((type) => Category)
  @JoinTable()
  categories: Category[];

  constructor(title: string, text: string, categories: Category[]) {
    this.title = title;
    this.text = text;
    this.categories = categories;
  }
}
