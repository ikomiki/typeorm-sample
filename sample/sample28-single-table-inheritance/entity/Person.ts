import { Column } from 'typeorm';
import { TableInheritance } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryColumn } from 'typeorm';

// todo: some things left to do:
// * check how it works when is join (conditions are not added in the joins right now)

@Entity('sample28_person')
@TableInheritance({ column: { name: 'type', type: 'varchar' } })
export abstract class Person {
  @PrimaryColumn('int')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
