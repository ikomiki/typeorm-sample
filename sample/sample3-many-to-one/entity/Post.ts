import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostDetails } from './PostDetails';
import { PostCategory } from './PostCategory';
import { PostAuthor } from './PostAuthor';
import { PostInformation } from './PostInformation';
import { PostImage } from './PostImage';
import { PostMetadata } from './PostMetadata';

@Entity('sample3_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  // 投稿はカテゴリと関係がありますが、逆の関係は設定されていません（カテゴリは投稿セットと関係がありません）
  @ManyToOne((type) => PostCategory, {
    cascade: true,
  })
  category: PostCategory;

  // 投稿は詳細と関係があります。ここでのカスケード挿入は、新しいPostDetailsインスタンスがこのリレーションに設定される場合、このPostエンティティを保存するときにデータベースに自動的に挿入されることを意味します
  @ManyToOne((type) => PostDetails, (details) => details.posts, {
    cascade: ['insert'],
  })
  details: PostDetails;

  // 投稿は詳細と関係があります。ここでのカスケード更新は、新しいPostDetailインスタンスがこのリレーションに設定される場合、このPostエンティティを保存するときにデータベースに自動的に挿入されることを意味します
  @ManyToOne((type) => PostImage, (image) => image.posts, {
    cascade: ['update'],
  })
  image: PostImage;

  // 投稿は詳細と関係があります。ここでのカスケード更新は、新しいPostDetailインスタンスがこのリレーションに設定される場合、このPostエンティティを保存するときにデータベースに自動的に挿入されることを意味します
  @ManyToOne((type) => PostMetadata, (metadata) => metadata.posts)
  metadata: PostMetadata | null;

  //投稿は詳細と関係があります。ここに完全なカスケード
  @ManyToOne((type) => PostInformation, (information) => information.posts, {
    cascade: true,
  })
  information: PostInformation;

  // 投稿は詳細と関係があります。ここではカスケードしません。永続化、更新、または削除できないことを意味します
  @ManyToOne((type) => PostAuthor, (author) => author.posts)
  author: PostAuthor;
}
