import { Column } from 'typeorm';
import { Person } from './Person';
import { ChildEntity } from 'typeorm';

@ChildEntity()
export class Employee extends Person {
  @Column()
  salary: number;
}
