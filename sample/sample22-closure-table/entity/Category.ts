import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { TreeLevelColumn } from 'typeorm';
import { TreeParent } from 'typeorm';
import { TreeChildren } from 'typeorm';
import { Tree } from 'typeorm';
import { Entity } from 'typeorm';

@Entity('sample22_category')
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeParent()
  parentCategory: Category;

  @TreeChildren({ cascade: true })
  childCategories: Category[];

  // @TreeLevelColumn()
  // level: number;

  // todo:
  // @TreeChildrenCount()
  // categoriesCount: number;
}
