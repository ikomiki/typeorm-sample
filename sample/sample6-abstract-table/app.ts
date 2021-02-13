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
  logging: ['log'],
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

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.author = author;
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
CREATE TABLE `sample6_post_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample6_post_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample6_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample6_blog` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample6_post_categories_sample6_post_category` (`sample6PostId` int NOT NULL, `sample6PostCategoryId` int NOT NULL, INDEX `IDX_af23b2bdc3977adac7ed5d4096` (`sample6PostId`), INDEX `IDX_fcd73234804c802d59913d4023` (`sample6PostCategoryId`), PRIMARY KEY (`sample6PostId`, `sample6PostCategoryId`)) ENGINE=InnoDB
CREATE TABLE `sample6_blog_categories_sample6_post_category` (`sample6BlogId` int NOT NULL, `sample6PostCategoryId` int NOT NULL, INDEX `IDX_8651191a223990f154ea65297a` (`sample6BlogId`), INDEX `IDX_e1a475c361d296b32cdc5ea9c6` (`sample6PostCategoryId`), PRIMARY KEY (`sample6BlogId`, `sample6PostCategoryId`)) ENGINE=InnoDB
ALTER TABLE `sample6_post` ADD CONSTRAINT `FK_800ba5e55396e7a32eb0616bac7` FOREIGN KEY (`authorId`) REFERENCES `sample6_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample6_blog` ADD CONSTRAINT `FK_0a9b2ce6ce54f51a48b5c8270c7` FOREIGN KEY (`authorId`) REFERENCES `sample6_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample6_post_categories_sample6_post_category` ADD CONSTRAINT `FK_af23b2bdc3977adac7ed5d4096c` FOREIGN KEY (`sample6PostId`) REFERENCES `sample6_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample6_post_categories_sample6_post_category` ADD CONSTRAINT `FK_fcd73234804c802d59913d40239` FOREIGN KEY (`sample6PostCategoryId`) REFERENCES `sample6_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample6_blog_categories_sample6_post_category` ADD CONSTRAINT `FK_8651191a223990f154ea65297a3` FOREIGN KEY (`sample6BlogId`) REFERENCES `sample6_blog`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample6_blog_categories_sample6_post_category` ADD CONSTRAINT `FK_e1a475c361d296b32cdc5ea9c6b` FOREIGN KEY (`sample6PostCategoryId`) REFERENCES `sample6_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
*/
