import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
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
  entities: [Post, Category],
};

createConnection(options)
  .then(async (connection) => {
    const postRepository = connection.getRepository(Post);

    const post1 = new Post('Me', 'hello me', [
      new Category('programming'),
      new Category('family'),
      new Category('chocolate'),
    ]);
    const post2 = new Post('Zorro', 'hello zorro', [
      new Category('woman'),
      new Category('money'),
      new Category('weapon'),
    ]);
    const post3 = new Post('About earth', 'hello earth', [
      new Category('kids'),
      new Category('people'),
      new Category('animals'),
    ]);
    const post4 = new Post('Zorro', 'hello zorro', [
      new Category('woman'),
      new Category('money'),
      new Category('weapon'),
    ]);

    console.log('saving posts');
    await postRepository.save([post1, post2, post3, post4]);

    console.log('loading the post. pay attention on order: ');
    const allPosts = await postRepository.find();
    console.log(allPosts);
  })
  .catch((error) => console.log('Error: ', error));
/*
query: CREATE TABLE `sample30_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample30_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample30_post_categories_sample30_category` (`sample30PostId` int NOT NULL, `sample30CategoryId` int NOT NULL, INDEX `IDX_16da935a8161aa65090f289c9b` (`sample30PostId`), INDEX `IDX_27553fb3caf89acff4dbe0f154` (`sample30CategoryId`), PRIMARY KEY (`sample30PostId`, `sample30CategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample30_post_categories_sample30_category` ADD CONSTRAINT `FK_16da935a8161aa65090f289c9b1` FOREIGN KEY (`sample30PostId`) REFERENCES `sample30_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample30_post_categories_sample30_category` ADD CONSTRAINT `FK_27553fb3caf89acff4dbe0f154c` FOREIGN KEY (`sample30CategoryId`) REFERENCES `sample30_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
*/
