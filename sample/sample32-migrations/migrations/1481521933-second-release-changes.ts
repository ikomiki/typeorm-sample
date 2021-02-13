import { MigrationInterface } from 'typeorm';
import { QueryRunner } from 'typeorm';

export class SecondReleaseMigration1481521933000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `post` CHANGE `name` `title` VARCHAR(500)');
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('ALTER TABLE `post` CHANGE `title` `name` VARCHAR(255)');
  }
}
