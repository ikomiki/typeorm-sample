import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BasePost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
