import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { PostCategory } from './entity/PostCategory';
import { PostAuthor } from './entity/PostAuthor';
import { Blog } from './entity/Blog';

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
    const category1 = new PostCategory();
    category1.name = 'post category #1';

    const category2 = new PostCategory();
    category2.name = 'post category #2';

    const author = new PostAuthor();
    author.name = 'Umed';
    author.firstName = 'Uma';
    author.secondName = 'Edi';

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.author = author;
    post.title2312312 = 'awesome title!';
    post.categories = [];
    post.categories.push(category1, category2);

    /*category1 = new PostCategory();
    category1.name = "post category #1";

    category2 = new PostCategory();
    category2.name = "post category #2";

    author = new PostAuthor();
    author.name = "Umed";*/

    const blog = new Blog();
    blog.text = 'Hello how are you?';
    blog.title = 'hello';
    blog.author = author;
    blog.title2312312 = 'awesome title!';
    blog.categories = [];
    blog.categories.push(category1, category2);

    const postRepository = connection.getRepository(Post);
    const blogRepository = connection.getRepository(Blog);

    postRepository
      .save(post)
      .then((post) => {
        console.log('Post has been saved');
        return postRepository.findOne(post.id);
      })
      .then((loadedPost) => {
        console.log('post is loaded: ', loadedPost);
        return blogRepository.save(blog);
      })
      .then((blog) => {
        console.log('Blog has been saved');
        return blogRepository.findOne(blog.id);
      })
      .then((loadedBlog) => {
        console.log('blog is loaded: ', loadedBlog);
        return blogRepository.save(blog);
      })
      .catch((error) => console.log('Cannot save. Error: ', error.stack ? error.stack : error));
  },
  (error) => console.log('Cannot connect: ', error.stack ? error.stack : error)
);
/*
query: CREATE TABLE `sample13_post_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample13_post_user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `secondName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample13_post_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `secondName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample13_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `title2312312` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample13_blog` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `title2312312` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample13_post_categories_sample13_post_category` (`sample13PostId` int NOT NULL, `sample13PostCategoryId` int NOT NULL, INDEX `IDX_986c29c29791d545bd3a604e35` (`sample13PostId`), INDEX `IDX_897c2785340602239ae351c79f` (`sample13PostCategoryId`), PRIMARY KEY (`sample13PostId`, `sample13PostCategoryId`)) ENGINE=InnoDB
query: CREATE TABLE `sample13_blog_categories_sample13_post_category` (`sample13BlogId` int NOT NULL, `sample13PostCategoryId` int NOT NULL, INDEX `IDX_f121826096219a07f4c8925fba` (`sample13BlogId`), INDEX `IDX_834bc13208b2fc09a42b9d2a97` (`sample13PostCategoryId`), PRIMARY KEY (`sample13BlogId`, `sample13PostCategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample13_post` ADD CONSTRAINT `FK_8d36cb07612ab356a14b6407353` FOREIGN KEY (`authorId`) REFERENCES `sample13_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample13_blog` ADD CONSTRAINT `FK_5b5531b4402304efece8bf3a92e` FOREIGN KEY (`authorId`) REFERENCES `sample13_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample13_post_categories_sample13_post_category` ADD CONSTRAINT `FK_986c29c29791d545bd3a604e35d` FOREIGN KEY (`sample13PostId`) REFERENCES `sample13_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample13_post_categories_sample13_post_category` ADD CONSTRAINT `FK_897c2785340602239ae351c79fc` FOREIGN KEY (`sample13PostCategoryId`) REFERENCES `sample13_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample13_blog_categories_sample13_post_category` ADD CONSTRAINT `FK_f121826096219a07f4c8925fba4` FOREIGN KEY (`sample13BlogId`) REFERENCES `sample13_blog`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample13_blog_categories_sample13_post_category` ADD CONSTRAINT `FK_834bc13208b2fc09a42b9d2a977` FOREIGN KEY (`sample13PostCategoryId`) REFERENCES `sample13_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION

*/
