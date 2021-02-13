import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { PostDetails } from './entity/PostDetails';
import { PostCategory } from './entity/PostCategory';
import { PostMetadata } from './entity/PostMetadata';
import { PostImage } from './entity/PostImage';
import { PostInformation } from './entity/PostInformation';
import { PostAuthor } from './entity/PostAuthor';

const options: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3966,
  username: 'root',
  password: 'admin',
  database: 'sample',
  dropSchema: false,
  logging: true,
  synchronize: true,
  entities: [Post, PostDetails, PostCategory, PostMetadata, PostImage, PostInformation, PostAuthor],
};

createConnection(options).then(
  (connection) => {
    const details = new PostDetails();
    details.authorName = 'Umed';
    details.comment = 'about post';
    details.metadata = 'post,details,one-to-one';

    const post = new Post();
    post.text = 'hello how are you?';
    post.title = 'hello';
    post.details = details;

    const postRepository = connection.getRepository(Post);

    postRepository
      .save(post)
      .then((post) => {
        console.log('Post has been saved. Lets try to find this post using query builder: ');
        return postRepository
          .createQueryBuilder('post')
          .where('post.title=:keyword')
          .setParameter('keyword', 'hello')
          .getMany();
      })
      .then((post) => {
        console.log('Loaded post: ', post);
      })
      .catch((error) => console.log('Cannot save. Error: ', error));
  },
  (error) => console.log('Cannot connect: ', error)
);

/*
CREATE TABLE `sample2_post_details`(
    `id` int NOT NULL AUTO_INCREMENT,
    `authorName` varchar(255) NOT NULL,
    `comment` varchar(255) NOT NULL,
    `metadata` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample2_post_category`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample2_post_author`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample2_post_information`(
    `id` int NOT NULL AUTO_INCREMENT,
    `text` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample2_post_image`(
    `id` int NOT NULL AUTO_INCREMENT,
    `url` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample2_post_metadata`(
    `id` int NOT NULL AUTO_INCREMENT,
    `description` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample2_post`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `text` varchar(255) NOT NULL,
    `categoryId` int NULL,
    `detailsId` int NULL,
    `imageId` int NULL,
    `metadataId` int NULL,
    `informationId` int NULL,
    `authorId` int NULL,
    UNIQUE INDEX `REL_363f0b11beae0864f55cfb5307`(`categoryId`),
    UNIQUE INDEX `REL_f186b855fc50f5c795bbafd143`(`detailsId`),
    UNIQUE INDEX `REL_2ee1f6ff40a4aeea44d1889e52`(`imageId`),
    UNIQUE INDEX `REL_a1bfc1e4be40dc74d8246a33d2`(`metadataId`),
    UNIQUE INDEX `REL_d05fbae14203f79f4ff5b448da`(`informationId`),
    UNIQUE INDEX `REL_f3e30573b86b1a45d9e8838bba`(`authorId`),
    PRIMARY KEY(`id`)
) ENGINE = InnoDB

query: ALTER TABLE `sample2_post` ADD CONSTRAINT `FK_363f0b11beae0864f55cfb5307d` FOREIGN KEY (`categoryId`) REFERENCES `sample2_post_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample2_post` ADD CONSTRAINT `FK_f186b855fc50f5c795bbafd143b` FOREIGN KEY (`detailsId`) REFERENCES `sample2_post_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample2_post` ADD CONSTRAINT `FK_2ee1f6ff40a4aeea44d1889e525` FOREIGN KEY (`imageId`) REFERENCES `sample2_post_image`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample2_post` ADD CONSTRAINT `FK_a1bfc1e4be40dc74d8246a33d2e` FOREIGN KEY (`metadataId`) REFERENCES `sample2_post_metadata`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample2_post` ADD CONSTRAINT `FK_d05fbae14203f79f4ff5b448da1` FOREIGN KEY (`informationId`) REFERENCES `sample2_post_information`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample2_post` ADD CONSTRAINT `FK_f3e30573b86b1a45d9e8838bba0` FOREIGN KEY (`authorId`) REFERENCES `sample2_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
*/
