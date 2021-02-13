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
  logging: ['error', 'log'],
  synchronize: true,
  entities: [__dirname + '/entity/*'],
};

createConnection(options).then(
  (connection) => {
    const postRepository = connection.getRepository(Post);
    const posts: Post[] = [];

    const author = new PostAuthor();
    author.name = 'Umed';

    for (let i = 0; i < 100; i++) {
      const category1 = new PostCategory();
      category1.name = 'post category #1';

      const category2 = new PostCategory();
      category2.name = 'post category #2';

      const post = new Post();
      post.text = 'Hello how are you?';
      post.title = 'hello';
      post.categories = [];
      post.categories.push(category1, category2);
      post.author = author;

      posts.push(post);
    }

    const qb = postRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.author', 'author')
      .leftJoinAndSelect('p.categories', 'categories')
      .skip(5)
      .take(10);

    Promise.all(posts.map((post) => postRepository.save(post)))
      .then((savedPosts) => {
        console.log('Posts has been saved. Lets try to load some posts');
        return qb.getMany();
      })
      .then((loadedPost) => {
        console.log('post loaded: ', loadedPost);
        console.log('now lets get total post count: ');
        return qb.getCount();
      })
      .then((totalCount) => {
        console.log('total post count: ', totalCount);
        console.log('now lets try to load it with same repository method:');

        return postRepository.findAndCount();
      })
      .then((entitiesWithCount) => {
        console.log('items: ', entitiesWithCount[0]);
        console.log('count: ', entitiesWithCount[1]);
      })
      .catch((error) => console.log('Cannot save. Error: ', error.stack ? error.stack : error));
  },
  (error) => console.log('Cannot connect: ', error.stack ? error.stack : error)
);

/*
query: CREATE TABLE `sample7_post_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample7_post_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample7_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample7_post_categories_sample7_post_category` (`sample7PostId` int NOT NULL, `sample7PostCategoryId` int NOT NULL, INDEX `IDX_0c68dc58eb3b5d6353c24b11f3` (`sample7PostId`), INDEX `IDX_d57d886f383885e6e35cd5a98d` (`sample7PostCategoryId`), PRIMARY KEY (`sample7PostId`, `sample7PostCategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample7_post` ADD CONSTRAINT `FK_7509e3fdc84715128d975e1355b` FOREIGN KEY (`authorId`) REFERENCES `sample7_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample7_post_categories_sample7_post_category` ADD CONSTRAINT `FK_0c68dc58eb3b5d6353c24b11f37` FOREIGN KEY (`sample7PostId`) REFERENCES `sample7_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample7_post_categories_sample7_post_category` ADD CONSTRAINT `FK_d57d886f383885e6e35cd5a98d1` FOREIGN KEY (`sample7PostCategoryId`) REFERENCES `sample7_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
*/
