import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './Author';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('sample23_category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Author)
  @JoinTable()
  author: Author;
}
