import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { PostCategory } from './entity/PostCategory';
import { PostAuthor } from './entity/PostAuthor';

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
  subscribers: [__dirname + '/subscriber/*'],
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
        console.log('---------------------------');
        return postRepository.findOne(post.id);
      })
      .then((loadedPost) => {
        console.log('post is loaded. Its uid is ' + loadedPost.uid);
        console.log('Lets now load it with relations.');
        console.log('---------------------------');
        return postRepository
          .createQueryBuilder('p')
          .leftJoinAndSelect('p.author', 'author')
          .leftJoinAndSelect('p.categories', 'categories')
          .where('p.id = :id', { id: loadedPost.id })
          .getOne();
      })
      .then((loadedPost) => {
        console.log('load finished. Now lets update entity');
        console.log('---------------------------');
        loadedPost.text = 'post updated';
        loadedPost.author.name = 'Bakha';
        return postRepository.save(loadedPost);
      })
      .then((loadedPost) => {
        console.log('update finished. Now lets remove entity');
        console.log('---------------------------');
        return postRepository.remove(loadedPost);
      })
      .then((loadedPost) => {
        console.log('post removed.');
      })
      .catch((error) => console.log('Cannot save. Error: ', error.stack ? error.stack : error));
  },
  (error) => console.log('Cannot connect: ', error.stack ? error.stack : error)
);
/*
query: CREATE TABLE `sample9_post_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample9_post_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample9_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample9_post_categories_sample9_post_category` (`sample9PostId` int NOT NULL, `sample9PostCategoryId` int NOT NULL, INDEX `IDX_8de3e27e92756a42fbfdb82df3` (`sample9PostId`), INDEX `IDX_6e64d095eb60e98f8fea68a653` (`sample9PostCategoryId`), PRIMARY KEY (`sample9PostId`, `sample9PostCategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample9_post` ADD CONSTRAINT `FK_f5e6ea45b067022f01e1904f4d3` FOREIGN KEY (`authorId`) REFERENCES `sample9_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample9_post_categories_sample9_post_category` ADD CONSTRAINT `FK_8de3e27e92756a42fbfdb82df37` FOREIGN KEY (`sample9PostId`) REFERENCES `sample9_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample9_post_categories_sample9_post_category` ADD CONSTRAINT `FK_6e64d095eb60e98f8fea68a6538` FOREIGN KEY (`sample9PostCategoryId`) REFERENCES `sample9_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION

*/
