import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sample19_category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
