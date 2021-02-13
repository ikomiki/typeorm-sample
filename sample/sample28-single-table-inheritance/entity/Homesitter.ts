import { Column } from 'typeorm';
import { Person } from './Person';
import { ChildEntity } from 'typeorm';

@ChildEntity('home-sitter')
export class Homesitter extends Person {
  @Column()
  numberOfKids: number;
}
