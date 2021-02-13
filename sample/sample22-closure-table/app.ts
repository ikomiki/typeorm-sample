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
  entities: [Category],
};

createConnection(options).then(
  (connection) => {
    const categoryRepository = connection.getTreeRepository(Category);

    const childChildCategory1 = new Category();
    childChildCategory1.name = 'Child #1 of Child #1 of Category #1';

    const childChildCategory2 = new Category();
    childChildCategory2.name = 'Child #1 of Child #2 of Category #1';

    const childCategory1 = new Category();
    childCategory1.name = 'Child #1 of Category #1';
    childCategory1.childCategories = [childChildCategory1];

    const childCategory2 = new Category();
    childCategory2.name = 'Child #2 of Category #1';
    childCategory2.childCategories = [childChildCategory2];

    const category1 = new Category();
    category1.name = 'Category #1';
    category1.childCategories = [childCategory1, childCategory2];

    return categoryRepository
      .save(category1)
      .then((category) => {
        console.log('Categories has been saved. Lets now load it and all its descendants:');
        return categoryRepository.findDescendants(category1);
      })
      .then((categories) => {
        console.log(categories);
        console.log('Descendants has been loaded. Now lets get them in a tree:');
        return categoryRepository.findDescendantsTree(category1);
      })
      .then((categories) => {
        console.log(categories);
        console.log(
          'Descendants in a tree has been loaded. Now lets get a count of the descendants:'
        );
        return categoryRepository.countDescendants(category1);
      })
      .then((count) => {
        console.log(count);
        console.log(
          'Descendants count has been loaded. Lets now load all ancestors of the childChildCategory1:'
        );
        return categoryRepository.findAncestors(childChildCategory1);
      })
      .then((categories) => {
        console.log(categories);
        console.log('Ancestors has been loaded. Now lets get them in a tree:');
        return categoryRepository.findAncestorsTree(childChildCategory1);
      })
      .then((categories) => {
        console.log(categories);
        console.log('Ancestors in a tree has been loaded. Now lets get a count of the ancestors:');
        return categoryRepository.countAncestors(childChildCategory1);
      })
      .then((count) => {
        console.log(count);
        console.log(
          'Ancestors count has been loaded. Now lets get a all roots (categories without parents):'
        );
        return categoryRepository.findRoots();
      })
      .then((categories) => {
        console.log(categories);
      })
      .catch((error) => console.log(error.stack));

    /*
    this way it does not work:

    let category1 = new Category();
    category1.name = "Category #1";
    // category1.childCategories;

    let childCategory1 = new Category();
    childCategory1.name = "Child #1 of Category #1";
    childCategory1.parentCategory = category1;

    let childCategory2 = new Category();
    childCategory2.name = "Child #2 of Category #1";
    childCategory2.parentCategory = category1;

    let childChildCategory1 = new Category();
    childChildCategory1.name = "Child #1 of Child #1 of Category #1";
    childChildCategory1.parentCategory = childCategory1;

    let childChildCategory2 = new Category();
    childChildCategory2.name = "Child #1 of Child #2 of Category #1";
    childChildCategory2.parentCategory = childCategory2;

    return categoryRepository
        .save(childChildCategory1)
        .then(category => {
            return categoryRepository.save(childChildCategory2);
        })
        .then(category => {
            console.log("Categories has been saved. Lets load them now.");
        })
        .catch(error => console.log(error.stack));
*/
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
query : CREATE TABLE `sample22_category`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `parentCategoryId` int NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB query : CREATE TABLE `sample22_category_closure`(
    `id_ancestor` int NOT NULL,
    `id_descendant` int NOT NULL,
    INDEX `IDX_90f937d0cc5e59e0b3577df79d`(`id_ancestor`),
    INDEX `IDX_42b7e4d79c50defd6740c20705`(`id_descendant`),
    PRIMARY KEY(`id_ancestor`, `id_descendant`)
) ENGINE = InnoDB query : ALTER TABLE `sample22_category` ADD CONSTRAINT `FK_a39d5f53ac2483b77854cd184ec` FOREIGN KEY(
    `parentCategoryId`
) REFERENCES `sample22_category`(
    `id`
)
ON  DELETE NO ACTION
ON
    UPDATE
        NO ACTION query : ALTER TABLE `sample22_category_closure` ADD CONSTRAINT `FK_90f937d0cc5e59e0b3577df79d8` FOREIGN KEY(
            `id_ancestor`
        ) REFERENCES `sample22_category`(
            `id`
        )
    ON  DELETE NO ACTION
    ON
        UPDATE
            NO ACTION query : ALTER TABLE `sample22_category_closure` ADD CONSTRAINT `FK_42b7e4d79c50defd6740c20705b` FOREIGN KEY(
                `id_descendant`
            ) REFERENCES `sample22_category`(
                `id`
            )
        ON  DELETE NO ACTION
        ON
            UPDATE
                NO ACTION
*/
