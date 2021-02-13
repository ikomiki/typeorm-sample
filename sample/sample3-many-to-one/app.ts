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
  logging: ['query', 'error'],
  synchronize: true,
  entities: [Post, PostDetails, PostCategory, PostMetadata, PostImage, PostInformation, PostAuthor],
};

createConnection(options)
  .then((connection) => {
    const details = new PostDetails();
    details.authorName = 'Umed';
    details.comment = 'about post';
    details.metadata = 'post,details,one-to-one';

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.details = details;

    const postRepository = connection.getRepository(Post);

    postRepository
      .save(post)
      .then((post) => console.log('Post has been saved'))
      .catch((error) => console.log('Cannot save. Error: ', error));
  })
  .catch((error) => console.log('Error: ', error));
/*
CREATE TABLE `sample3_post_details`(
    `id` int NOT NULL AUTO_INCREMENT,
    `authorName` varchar(255) NULL,
    `comment` varchar(255) NULL,
    `metadata` varchar(255) NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample3_post_category`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample3_post_author`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample3_post_information`(
    `id` int NOT NULL AUTO_INCREMENT,
    `text` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample3_post_image`(
    `id` int NOT NULL AUTO_INCREMENT,
    `url` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample3_post_metadata`(
    `id` int NOT NULL AUTO_INCREMENT,
    `description` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB CREATE TABLE `sample3_post`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `text` varchar(255) NOT NULL,
    `categoryId` int NULL,
    `detailsId` int NULL,
    `imageId` int NULL,
    `metadataId` int NULL,
    `informationId` int NULL,
    `authorId` int NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB

ALTER TABLE `sample3_post` ADD CONSTRAINT `FK_b9eb30c8c8331f63355a9d9d7bd` FOREIGN KEY (`categoryId`) REFERENCES `sample3_post_category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample3_post` ADD CONSTRAINT `FK_b4368077a0b59206101d606a41a` FOREIGN KEY (`detailsId`) REFERENCES `sample3_post_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample3_post` ADD CONSTRAINT `FK_acd81eb457e58689af3699265df` FOREIGN KEY (`imageId`) REFERENCES `sample3_post_image`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample3_post` ADD CONSTRAINT `FK_49c8315b47b41bf21bebc995c01` FOREIGN KEY (`metadataId`) REFERENCES `sample3_post_metadata`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample3_post` ADD CONSTRAINT `FK_e5aee5880edc19ac1b967f82429` FOREIGN KEY (`informationId`) REFERENCES `sample3_post_information`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
ALTER TABLE `sample3_post` ADD CONSTRAINT `FK_7f7c467dd1155c7619dc9f42a63` FOREIGN KEY (`authorId`) REFERENCES `sample3_post_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
*/
