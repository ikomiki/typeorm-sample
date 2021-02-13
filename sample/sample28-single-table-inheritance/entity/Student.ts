import { Column } from 'typeorm';
import { Person } from './Person';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Student extends Person {
  @Column()
  faculty: string;
}
