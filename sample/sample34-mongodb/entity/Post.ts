import { Column, Entity } from 'typeorm';
import { ObjectIdColumn } from 'typeorm';
import { ObjectID } from 'typeorm';

@Entity('sample34_post')
export class Post {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column('int', {
    nullable: false,
  })
  likesCount: number;
}
