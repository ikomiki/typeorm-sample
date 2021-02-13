import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './Author';
import { ManyToOne } from 'typeorm';
import { Category } from './Category';
import { ManyToMany } from 'typeorm';
import { JoinTable } from 'typeorm';
import { OneToOne } from 'typeorm';
import { JoinColumn } from 'typeorm';
import { PostMetadata } from './PostMetadata';

@Entity('sample19_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => Author, { cascade: true })
  author: Author;

  @ManyToMany((type) => Category, { cascade: true })
  @JoinTable()
  categories: Category[];

  @OneToOne((type) => PostMetadata, { cascade: true })
  @JoinColumn()
  metadata: PostMetadata;
}
