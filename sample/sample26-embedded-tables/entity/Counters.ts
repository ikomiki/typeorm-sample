import { Column } from 'typeorm';

export class Counters {
  @Column()
  raiting: number;

  @Column()
  stars: number;

  @Column()
  commentCount: number;

  @Column()
  metadata: string;
}
