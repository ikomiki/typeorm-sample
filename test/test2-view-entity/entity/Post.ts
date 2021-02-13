import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { JoinColumn } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity({
  name: 'test02_post',
})
// @Entity('test02_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  title: string;

  @Column({
    nullable: false,
  })
  text: string;

  @OneToMany((_type) => Category, (category) => category.post, {
    cascade: true,
  })
  categories: Category[];
}
