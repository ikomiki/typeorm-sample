import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostAuthor } from './PostAuthor';
import { JoinColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import { JoinTable } from 'typeorm';
import { ManyToMany } from 'typeorm';

@Entity('sample14_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @OneToOne((type) => PostAuthor, (author) => author.post, {
    cascade: true,
  })
  @JoinColumn() // これにコメントすると、JoinColumnは少なくとも1対1の関係の片側にある必要があるため、エラーが発生します
  // @JoinTable() // これをコメント解除すると、JoinTableはここでは許可されていないため、エラーが発生します（多対多のみ）
  author: PostAuthor;

  @OneToMany((type) => PostAuthor, (author) => author.editedPost, {
    cascade: true,
  })
  // @JoinColumn() // これをコメント解除すると、JoinColumnはここでは許可されていないため、エラーが発生します（多対1/1対1のみ）
  // @JoinTable() // これをコメント解除すると、JoinTableはここでは許可されていないため、エラーが発生します（多対多のみ）
  editors: PostAuthor[];

  @ManyToMany((type) => PostAuthor, (author) => author.manyPosts)
  @JoinTable() // これにコメントすると、JoinTableは少なくとも多対多の関係の片側にある必要があるため、エラーが発生します。
  manyAuthors: PostAuthor[];
}
