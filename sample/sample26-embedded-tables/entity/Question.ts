import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Counters } from './Counters';

@Entity('sample26_question')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column((type) => Counters)
  counters: Counters;
}
