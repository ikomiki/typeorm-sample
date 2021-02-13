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

    const category1 = new Category();
    category1.name = 'category #1';

    const category2 = new Category();
    category2.name = 'category #2';

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.categories = [category1, category2];

    const author = new Author();
    author.name = 'Umed';
    post.author = author;

    const author2 = new Author();
    author2.name = 'Bakhrom';

    postRepository
      .save(post)
      .then((post) => {
        return postRepository
          .createQueryBuilder('post')
          .leftJoin('post.categories', 'categories')
          .leftJoin('categories.author', 'author')
          .where('post.id=1')
          .getOne();
      })
      .then((loadedPost) => {
        console.log('loadedPosts: ', loadedPost);
        console.log('Lets update a post - add a new category and change author');

        const category3 = new Category();
        category3.name = 'category #3';
        post.categories.push(category3);

        post.author = author2;

        return postRepository.save(post);
      })
      .then((updatedPost) => {
        return postRepository
          .createQueryBuilder('post')
          .leftJoinAndSelect('post.author', 'author')
          .leftJoinAndSelect('post.categories', 'categories')
          .where('post.id=:id', { id: post.id })
          .getOne();
      })
      .then((loadedPost) => {
        console.log(loadedPost);
        console.log('Lets update a post - return old author back:');

        console.log('updating with: ', author);
        loadedPost.title = "Umed's post";
        loadedPost.author = author;
        return postRepository.save(loadedPost);
      })
      .then((updatedPost) => {
        return postRepository
          .createQueryBuilder('post')
          .leftJoinAndSelect('post.author', 'author')
          .leftJoinAndSelect('post.categories', 'categories')
          .where('post.id=:id', { id: post.id })
          .getOne();
      })
      .then((loadedPost) => {
        console.log(loadedPost);
        console.log("Now lets remove post's author:");
        post.author = null;
        return postRepository.save(post);
      })
      .then((updatedPost) => {
        return postRepository
          .createQueryBuilder('post')
          .leftJoinAndSelect('post.author', 'author')
          .leftJoinAndSelect('post.categories', 'categories')
          .where('post.id=:id', { id: post.id })
          .getOne();
      })
      .then((loadedPost) => {
        console.log(loadedPost);
        console.log("Finally bakhrom's post:");
        post.author = author2;
        return postRepository.save(post);
      })
      .then((updatedPost) => {
        return postRepository
          .createQueryBuilder('post')
          .leftJoinAndSelect('post.author', 'author')
          .leftJoinAndSelect('post.categories', 'categories')
          .where('post.id=:id', { id: post.id })
          .getOne();
      })
      .then((loadedPost) => {
        console.log(loadedPost);
      })
      .catch((error) => console.log(error.stack));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
query: CREATE TABLE `sample23_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample23_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample23_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample23_category_author_sample23_author` (`sample23CategoryId` int NOT NULL, `sample23AuthorId` int NOT NULL, INDEX `IDX_fd59370107052342bf0e7665e5` (`sample23CategoryId`), INDEX `IDX_3ba5c4df6e5f3a4a40615b1099` (`sample23AuthorId`), PRIMARY KEY (`sample23CategoryId`, `sample23AuthorId`)) ENGINE=InnoDB
query: CREATE TABLE `sample23_post_categories_sample23_category` (`sample23PostId` int NOT NULL, `sample23CategoryId` int NOT NULL, INDEX `IDX_18790529e6d464987df98e1b30` (`sample23PostId`), INDEX `IDX_deecbaf100eaf15e46a01fafda` (`sample23CategoryId`), PRIMARY KEY (`sample23PostId`, `sample23CategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample23_post` ADD CONSTRAINT `FK_ee5244beef95f3de8c004441f69` FOREIGN KEY (`authorId`) REFERENCES `sample23_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample23_category_author_sample23_author` ADD CONSTRAINT `FK_fd59370107052342bf0e7665e5b` FOREIGN KEY (`sample23CategoryId`) REFERENCES `sample23_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample23_category_author_sample23_author` ADD CONSTRAINT `FK_3ba5c4df6e5f3a4a40615b1099d` FOREIGN KEY (`sample23AuthorId`) REFERENCES `sample23_author`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample23_post_categories_sample23_category` ADD CONSTRAINT `FK_18790529e6d464987df98e1b305` FOREIGN KEY (`sample23PostId`) REFERENCES `sample23_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample23_post_categories_sample23_category` ADD CONSTRAINT `FK_deecbaf100eaf15e46a01fafda2` FOREIGN KEY (`sample23CategoryId`) REFERENCES `sample23_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
*/
