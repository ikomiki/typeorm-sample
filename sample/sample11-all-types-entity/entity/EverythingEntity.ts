import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn } from 'typeorm';
import { UpdateDateColumn } from 'typeorm';

export enum SampleEnum {
  ONE = 'one',
  TWO = 'two',
}

@Entity('sample11_everything_entity')
export class EverythingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  text: string;

  @Column({ length: '32' })
  shortTextColumn: string;

  @Column()
  numberColumn: number;

  @Column('integer')
  integerColumn: number;

  @Column('int')
  intColumn: number;

  @Column('smallint')
  smallintColumn: number;

  @Column('bigint')
  bigintColumn: number;

  @Column('float')
  floatColumn: number;

  @Column('double')
  doubleColumn: number;

  @Column('decimal')
  decimalColumn: number;

  @Column()
  date: Date;

  @Column('date')
  dateColumn: Date;

  @Column('time')
  timeColumn: Date;

  @Column('boolean')
  isBooleanColumn: boolean;

  @Column('boolean')
  isSecondBooleanColumn: boolean;

  @Column('json')
  jsonColumn: any;

  // @Column()
  // alsoJson: any;

  // @Column('simple_array')
  // simpleArrayColumn: string[];

  @Column('enum', { enum: SampleEnum })
  enum: SampleEnum;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
/*
query : CREATE TABLE `sample11_everything_entity`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `text` text NOT NULL,
    `shortTextColumn` varchar(32) NOT NULL,
    `numberColumn` int NOT NULL,
    `integerColumn` int NOT NULL,
    `intColumn` int NOT NULL,
    `smallintColumn` smallint NOT NULL,
    `bigintColumn` bigint NOT NULL,
    `floatColumn` float NOT NULL,
    `doubleColumn` double NOT NULL,
    `decimalColumn` decimal NOT NULL,
    `date` datetime NOT NULL,
    `dateColumn` date NOT NULL,
    `timeColumn` time NOT NULL,
    `isBooleanColumn` tinyint NOT NULL,
    `isSecondBooleanColumn` tinyint NOT NULL,
    `jsonColumn` json NOT NULL,
    `enum` enum('one', 'two') NOT NULL,
    `createdDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
ON
    UPDATE
        CURRENT_TIMESTAMP(6),
        PRIMARY KEY(`id`)
) ENGINE = InnoDB
*/
