import 'reflect-metadata';
import { ConnectionOptions, createConnection, EntitySchema } from 'typeorm';
import { Post } from './entity/Post';
import { PostDetails } from './entity/PostDetails';
import { Category } from './entity/Category';
import { Image } from './entity/Image';

// NOTE: this example is not working yet, only concepts of how this feature must work described here

const PostEntity = new EntitySchema<Post>(require(__dirname + '/schemas/post.json'));
const PostDetailsEntity = new EntitySchema<PostDetails>(
  require(__dirname + '/schemas/post-details.json')
);
const CategoryEntity = new EntitySchema<Category>(require(__dirname + '/schemas/category.json'));
const ImageEntity = new EntitySchema<Image>(require(__dirname + '/schemas/image.json'));

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
  // entitySchemaDirectories: [__dirname + "/schemas"],
  entities: [PostEntity, PostDetailsEntity, CategoryEntity, ImageEntity],
};

createConnection(options)
  .then((connection) => {
    const postRepository = connection.getRepository<Post>('Post');

    const post: Post = {
      title: 'Hello post',
      text: 'I am virtual post!',
      details: {
        metadata: '#post,#virtual',
        comment: 'it all about a post',
      },
      images: [],
      secondaryImages: [],
      categories: [],
    };

    postRepository
      .save(post)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error.stack ? error.stack : error));
  })
  .catch((error) => console.log(error.stack ? error.stack : error));
/*
query: CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `detailsId` int NULL, UNIQUE INDEX `REL_7fe670caeded8b3e26b76fe2a4` (`detailsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `post_details` (`id` int NOT NULL AUTO_INCREMENT, `comment` varchar(255) NOT NULL, `metadata` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `image` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `url` varchar(255) NOT NULL, `postId` int NULL, `secondaryPostId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `post_categories_category` (`postId` int NOT NULL, `categoryId` int NOT NULL, INDEX `IDX_93b566d522b73cb8bc46f7405b` (`postId`), INDEX `IDX_a5e63f80ca58e7296d5864bd2d` (`categoryId`), PRIMARY KEY (`postId`, `categoryId`)) ENGINE=InnoDB
query: ALTER TABLE `post` ADD CONSTRAINT `FK_7fe670caeded8b3e26b76fe2a45` FOREIGN KEY (`detailsId`) REFERENCES `post_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `image` ADD CONSTRAINT `FK_72da7f42d43f0be3b3ef35692a0` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `image` ADD CONSTRAINT `FK_8504e6f95fe03e5b81825986a84` FOREIGN KEY (`secondaryPostId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `post_categories_category` ADD CONSTRAINT `FK_93b566d522b73cb8bc46f7405bd` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `post_categories_category` ADD CONSTRAINT `FK_a5e63f80ca58e7296d5864bd2d3` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
*/
