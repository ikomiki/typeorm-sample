import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { PostCategory } from './entity/PostCategory';
import { PostAuthor } from './entity/PostAuthor';
import { EverythingSubscriber } from './subscriber/EverythingSubscriber';

// first create a connection
const options: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3966,
  username: 'root',
  password: 'admin',
  database: 'sample',
  dropSchema: false,
  logging: ['query', 'error'],
  synchronize: true,
  entities: [Post, PostAuthor, PostCategory],
  subscribers: [EverythingSubscriber],
};

createConnection(options).then(
  (connection) => {
    const category1 = new PostCategory();
    category1.name = 'post category #1';

    const category2 = new PostCategory();
    category2.name = 'post category #2';

    const author = new PostAuthor();
    author.name = 'Umed';

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.categories = [];
    post.categories.push(category1, category2);
    post.author = author;

    const postRepository = connection.getRepository(Post);

    postRepository
      .save(post)
      .then((post) => {
        console.log('Post has been saved');
        return postRepository.findOne(post.id);
      })
      .then((loadedPost) => {
        console.log('---------------------------');
        console.log('post is loaded. Lets now load it with relations.');
        return postRepository
          .createQueryBuilder('p')
          .leftJoinAndSelect('p.author', 'author')
          .leftJoinAndSelect('p.categories', 'categories')
          .where('p.id = :id', { id: loadedPost.id })
          .getOne();
      })
      .then((loadedPost) => {
        console.log('---------------------------');
        console.log('load finished. Now lets update entity');
        loadedPost.text = 'post updated';
        loadedPost.author.name = 'Bakha';
        return postRepository.save(loadedPost);
      })
      .then((loadedPost) => {
        console.log('---------------------------');
        console.log('update finished. Now lets remove entity');
        return postRepository.remove(loadedPost);
      })
      .then((loadedPost) => {
        console.log('---------------------------');
        console.log('post removed.');
      })
      .catch((error) => console.log('Cannot save. Error: ', error.stack ? error.stack : error));
  },
  (error) => console.log('Cannot connect: ', error.stack ? error.stack : error)
);

/*
CREATE TABLE `sample5_post_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample5_post_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample5_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample5_post_categories_sample5_post_category` (`sample5PostId` int NOT NULL, `sample5PostCategoryId` int NOT NULL, INDEX `IDX_2dba567c1f4cdeaacda088ef57` (`sample5PostId`), INDEX `IDX_dfaf967e147b04cf7d9438a78d` (`sample5PostCategoryId`), PRIMARY KEY (`sample5PostId`, `sample5PostCategoryId`)) ENGINE=InnoDB
ALTER TABLE `sample5_post` ADD CONSTRAINT `FK_db8aae2080503434988316fb85c` FOREIGN KEY (`authorId`) REFERENCES `sample5_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample5_post_categories_sample5_post_category` ADD CONSTRAINT `FK_2dba567c1f4cdeaacda088ef570` FOREIGN KEY (`sample5PostId`) REFERENCES `sample5_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample5_post_categories_sample5_post_category` ADD CONSTRAINT `FK_dfaf967e147b04cf7d9438a78d4` FOREIGN KEY (`sample5PostCategoryId`) REFERENCES `sample5_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION

*/
