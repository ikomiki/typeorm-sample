import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { ManyToOne } from 'typeorm';
import { ManyToMany } from 'typeorm';

@Entity('sample14_post_author')
export class PostAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne((type) => Post, (post) => post.author)
  // @JoinColumn() // これをコメント解除すると、JoinColumnは片側でのみ許可されるため、エラーが発生します
  post: Post;

  @ManyToOne((type) => Post, (post) => post.editors)
  // @JoinColumn() // ここではJoinColumnはオプションであるため、存在するかどうかに関係なく、エラーは発生しません。
  editedPost: Post;

  @ManyToMany((type) => Post, (post) => post.manyAuthors)
  // @JoinTable() // これをコメント解除すると、ManyToManyリレーションの片側だけがJoinTableデコレータを持つことができるため、エラーが発生します。
  manyPosts: Post[];
}
