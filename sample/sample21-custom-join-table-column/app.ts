import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { Author } from './entity/Author';
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
  entities: [Post, Author, Category],
};

createConnection(options).then(
  (connection) => {
    const postRepository = connection.getRepository(Post);

    const author = new Author();
    author.name = 'Umed';

    const category1 = new Category();
    category1.name = 'Category #1';

    const category2 = new Category();
    category2.name = 'Category #2';

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.author = author;
    post.categories = [category1, category2];

    postRepository
      .save(post)
      .then((post) => {
        console.log('Post has been saved. Lets load it now.');
        return postRepository.find({
          join: {
            alias: 'post',
            leftJoinAndSelect: {
              categories: 'post.categories',
              author: 'post.author', // note that table column is used, not object property
            },
          },
        });
      })
      .then((loadedPosts) => {
        console.log('loadedPosts: ', loadedPosts);
      })
      .catch((error) => console.log(error.stack));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
query: CREATE TABLE `sample21_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample21_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample21_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `user` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `_post_categories` (`sample21PostId` int NOT NULL, `sample21CategoryId` int NOT NULL, INDEX `IDX_a258522e89dc7f4247979d0a13` (`sample21PostId`), INDEX `IDX_e865b31090fb1c0bb82fbe6ea6` (`sample21CategoryId`), PRIMARY KEY (`sample21PostId`, `sample21CategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample21_post` ADD CONSTRAINT `FK_d61bb87863b1788835710ef727f` FOREIGN KEY (`user`) REFERENCES `sample21_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `_post_categories` ADD CONSTRAINT `FK_a258522e89dc7f4247979d0a139` FOREIGN KEY (`sample21PostId`) REFERENCES `sample21_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `_post_categories` ADD CONSTRAINT `FK_e865b31090fb1c0bb82fbe6ea6e` FOREIGN KEY (`sample21CategoryId`) REFERENCES `sample21_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION

*/
