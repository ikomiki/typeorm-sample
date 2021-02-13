import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostCategory } from './PostCategory';
import { PostAuthor } from './PostAuthor';
import { ManyToOne } from 'typeorm';
import { AfterLoad } from 'typeorm';
import { AfterInsert } from 'typeorm';
import { BeforeInsert } from 'typeorm';
import { BeforeUpdate } from 'typeorm';
import { AfterUpdate } from 'typeorm';
import { BeforeRemove } from 'typeorm';
import { AfterRemove } from 'typeorm';
import { JoinTable } from 'typeorm';

@Entity('sample9_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToOne((type) => PostAuthor, (post) => post.posts, {
    cascade: true,
  })
  author: PostAuthor;

  @ManyToMany((type) => PostCategory, (category) => category.posts, {
    cascade: true,
  })
  @JoinTable()
  categories: PostCategory[];

  uid: number;

  @AfterLoad()
  generateRandomNumbers() {
    console.log(`event: Post "${this.title}" entity has been loaded and callback executed`);
    this.uid = Math.ceil(Math.random() * 1000);
  }

  @BeforeInsert()
  doSomethingBeforeInsertion() {
    console.log('event: Post entity will be inserted so soon...');
  }

  @AfterInsert()
  doSomethingAfterInsertion() {
    console.log('event: Post entity has been inserted and callback executed');
  }

  @BeforeUpdate()
  doSomethingBeforeUpdate() {
    console.log('event: Post entity will be updated so soon...');
  }

  @AfterUpdate()
  doSomethingAfterUpdate() {
    console.log('event: Post entity has been updated and callback executed');
  }

  @BeforeRemove()
  doSomethingBeforeRemove() {
    console.log('event: Post entity will be removed so soon...');
  }

  @AfterRemove()
  doSomethingAfterRemove() {
    console.log('event: Post entity has been removed and callback executed');
  }
}
