import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { OneToMany } from 'typeorm';
import { AfterRemove } from 'typeorm';
import { BeforeRemove } from 'typeorm';
import { AfterUpdate } from 'typeorm';
import { BeforeUpdate } from 'typeorm';
import { AfterInsert } from 'typeorm';
import { BeforeInsert } from 'typeorm';

@Entity('sample9_post_author')
export class PostAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany((type) => Post, (post) => post.author)
  posts: Post[];

  @BeforeInsert()
  doSomethingBeforeInsertion() {
    console.log('event: PostAuthor entity will be inserted so soon...');
  }

  @AfterInsert()
  doSomethingAfterInsertion() {
    console.log('event: PostAuthor entity has been inserted and callback executed');
  }

  @BeforeUpdate()
  doSomethingBeforeUpdate() {
    console.log('event: PostAuthor entity will be updated so soon...');
  }

  @AfterUpdate()
  doSomethingAfterUpdate() {
    console.log('event: PostAuthor entity has been updated and callback executed');
  }

  @BeforeRemove()
  doSomethingBeforeRemove() {
    console.log('event: PostAuthor entity will be removed so soon...');
  }

  @AfterRemove()
  doSomethingAfterRemove() {
    console.log('event: PostAuthor entity has been removed and callback executed');
  }
}
