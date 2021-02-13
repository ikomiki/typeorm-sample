import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Category } from './entity/Category';

const options: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3966,
  username: 'root',
  password: 'admin',
  database: 'sample',
  dropSchema: false,
  logging: ['query', 'error', 'log'],
  synchronize: true,
  entities: [__dirname + '/entity/*'],
};

createConnection(options).then(
  (connection) => {
    const categoryRepository = connection.getRepository(Category);

    const category1 = new Category();
    category1.name = 'category #1';

    const mainCategory = new Category();
    mainCategory.manyCategories = [];
    mainCategory.name = 'main category';
    mainCategory.oneCategory = category1;
    mainCategory.manyCategories.push(category1);
    mainCategory.oneManyCategory = category1;

    categoryRepository
      .save(mainCategory)
      .then((savedCategory) => {
        console.log('saved category: ', savedCategory);
      })
      .catch((error) => console.log('Cannot save. Error: ', error.stack ? error.stack : error));
  },
  (error) => console.log('Cannot connect: ', error.stack ? error.stack : error)
);
/*
uery: CREATE TABLE `sample8_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `oneCategoryId` int NULL, `oneManyCategoryId` int NULL, UNIQUE INDEX `REL_f51d3022a540700072bcd60e76` (`oneCategoryId`), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample8_category_many_categories_sample8_category` (`sample8CategoryId_1` int NOT NULL, `sample8CategoryId_2` int NOT NULL, INDEX `IDX_52e8688c3c99d9a9a8162a94f5` (`sample8CategoryId_1`), INDEX `IDX_6851dd792a6d6aefc898bda0a7` (`sample8CategoryId_2`), PRIMARY KEY (`sample8CategoryId_1`, `sample8CategoryId_2`)) ENGINE=InnoDB
query: ALTER TABLE `sample8_category` ADD CONSTRAINT `FK_f51d3022a540700072bcd60e761` FOREIGN KEY (`oneCategoryId`) REFERENCES `sample8_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample8_category` ADD CONSTRAINT `FK_545e862570b150787cd78b5596f` FOREIGN KEY (`oneManyCategoryId`) REFERENCES `sample8_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample8_category_many_categories_sample8_category` ADD CONSTRAINT `FK_52e8688c3c99d9a9a8162a94f55` FOREIGN KEY (`sample8CategoryId_1`) REFERENCES `sample8_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample8_category_many_categories_sample8_category` ADD CONSTRAINT `FK_6851dd792a6d6aefc898bda0a7d` FOREIGN KEY (`sample8CategoryId_2`) REFERENCES `sample8_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
*/
