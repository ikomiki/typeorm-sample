import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostDetails } from './PostDetails';
import { PostCategory } from './PostCategory';
import { PostAuthor } from './PostAuthor';
import { PostInformation } from './PostInformation';
import { PostImage } from './PostImage';
import { PostMetadata } from './PostMetadata';
import { JoinColumn } from 'typeorm';

@Entity('sample2_post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  // 投稿はカテゴリと関係がありますが、逆の関係は設定されていません（カテゴリは投稿セットと関係がありません）
  @OneToOne((type) => PostCategory, {
    cascade: true,
  })
  @JoinColumn()
  category: PostCategory;

  // 投稿は詳細と関係があります。ここでのカスケード挿入は、新しいPostDetailsインスタンスがこのリレーションに設定される場合、このPostエンティティを保存するときにデータベースに自動的に挿入されることを意味します
  @OneToOne((type) => PostDetails, (details) => details.post, {
    cascade: ['insert'],
  })
  @JoinColumn()
  details: PostDetails;

  // 投稿は詳細と関係があります。ここでのカスケード更新は、新しいPostDetailインスタンスがこのリレーションに設定される場合、このPostエンティティを保存するときにデータベースに自動的に挿入されることを意味します
  @OneToOne((type) => PostImage, (image) => image.post, {
    cascade: ['update'],
  })
  @JoinColumn()
  image: PostImage;

  // 投稿は詳細と関係があります。ここでのカスケード更新は、新しいPostDetailインスタンスがこのリレーションに設定される場合、このPostエンティティを保存するときにデータベースに自動的に挿入されることを意味します
  @OneToOne((type) => PostMetadata, (metadata) => metadata.post)
  @JoinColumn()
  metadata: PostMetadata | null;

  // 投稿は詳細と関係があります。ここに完全なカスケード
  @OneToOne((type) => PostInformation, (information) => information.post, {
    cascade: true,
  })
  @JoinColumn()
  information: PostInformation;

  // 投稿は詳細と関係があります。ここではカスケードしません。永続化、更新、または削除できないことを意味します
  @OneToOne((type) => PostAuthor, (author) => author.post)
  @JoinColumn()
  author: PostAuthor;
}
