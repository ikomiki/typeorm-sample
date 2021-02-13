import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sample13_post_user')
export class PostUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column()
  secondName: string;
}
