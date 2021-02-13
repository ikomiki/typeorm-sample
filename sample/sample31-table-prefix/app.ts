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
  entityPrefix: 'samples_', // pay attention on this prefix
  entities: [Post, Author, Category],
};

createConnection(options)
  .then(async (connection) => {
    const category1 = new Category();
    category1.name = 'Animals';

    const category2 = new Category();
    category2.name = 'People';

    const author = new Author();
    author.firstName = 'Umed';
    author.lastName = 'Khudoiberdiev';

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.author = author;
    post.categories = [category1, category2];

    const postRepository = connection.getRepository(Post);

    await postRepository.save(post);
    console.log('Post has been saved');
  })
  .catch((error) => console.log('Error: ', error));
/*
query: CREATE TABLE `samples_sample31_author` (`id` int NOT NULL AUTO_INCREMENT, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `samples_sample31_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `samples_sample31_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `samples_sample31_post_categories_sample31_category` (`sample31PostId` int NOT NULL, `sample31CategoryId` int NOT NULL, INDEX `IDX_2b6c727c0d28fb207093a65351` (`sample31PostId`), INDEX `IDX_98c9c3385c0cbafa4e81e04ef6` (`sample31CategoryId`), PRIMARY KEY (`sample31PostId`, `sample31CategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `samples_sample31_post` ADD CONSTRAINT `FK_6a4dbf4636ed94561386bbd37a3` FOREIGN KEY (`authorId`) REFERENCES `samples_sample31_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `samples_sample31_post_categories_sample31_category` ADD CONSTRAINT `FK_2b6c727c0d28fb207093a65351e` FOREIGN KEY (`sample31PostId`) REFERENCES `samples_sample31_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `samples_sample31_post_categories_sample31_category` ADD CONSTRAINT `FK_98c9c3385c0cbafa4e81e04ef6f` FOREIGN KEY (`sample31CategoryId`) REFERENCES `samples_sample31_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query:
*/
