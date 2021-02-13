import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { PostDetails } from './entity/PostDetails';

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
  entities: [__dirname + '/entity/*'],
};

createConnection(options).then(
  (connection) => {
    const details1 = new PostDetails();
    details1.comment = 'People';

    const details2 = new PostDetails();
    details2.comment = 'Human';

    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.details = [details1, details2];

    const postRepository = connection.getRepository(Post);

    postRepository
      .save(post)
      .then((post) => console.log('Post has been saved'))
      .catch((error) => console.log('Cannot save. Error: ', error));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*

CREATE TABLE `sample4_post_details` (`id` int NOT NULL AUTO_INCREMENT, `authorName` varchar(255) NULL, `comment` varchar(255) NULL, `metadata` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_information` (`id` int NOT NULL AUTO_INCREMENT, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_image` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_metadata` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample4_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_categories_sample4_post_category` (`sample4PostId` int NOT NULL, `sample4PostCategoryId` int NOT NULL, INDEX `IDX_c8baf411d7cf2ef20baeb2e41d` (`sample4PostId`), INDEX `IDX_0e4c5f8c8fa7c3446579523438` (`sample4PostCategoryId`), PRIMARY KEY (`sample4PostId`, `sample4PostCategoryId`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_details_sample4_post_details` (`sample4PostId` int NOT NULL, `sample4PostDetailsId` int NOT NULL, INDEX `IDX_e70c862c483fbf36a629ead03c` (`sample4PostId`), INDEX `IDX_15f9eecbcfcf9c3f824f8cc3aa` (`sample4PostDetailsId`), PRIMARY KEY (`sample4PostId`, `sample4PostDetailsId`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_images_sample4_post_image` (`sample4PostId` int NOT NULL, `sample4PostImageId` int NOT NULL, INDEX `IDX_4d73c374a61398dcfd491d6e99` (`sample4PostId`), INDEX `IDX_3c919026fcd57d50ac797c292e` (`sample4PostImageId`), PRIMARY KEY (`sample4PostId`, `sample4PostImageId`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_metadatas_sample4_post_metadata` (`sample4PostId` int NOT NULL, `sample4PostMetadataId` int NOT NULL, INDEX `IDX_f3e27d068f03ed5c25ec4d43c2` (`sample4PostId`), INDEX `IDX_69752de4f4d134655a6105d0d2` (`sample4PostMetadataId`), PRIMARY KEY (`sample4PostId`, `sample4PostMetadataId`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_informations_sample4_post_information` (`sample4PostId` int NOT NULL, `sample4PostInformationId` int NOT NULL, INDEX `IDX_e6c3630d97998019568f52da17` (`sample4PostId`), INDEX `IDX_a9563e630f97be86c8fce797e0` (`sample4PostInformationId`), PRIMARY KEY (`sample4PostId`, `sample4PostInformationId`)) ENGINE=InnoDB
CREATE TABLE `sample4_post_authors_sample4_post_author` (`sample4PostId` int NOT NULL, `sample4PostAuthorId` int NOT NULL, INDEX `IDX_4cec9ca9d8e1614bd1c979110d` (`sample4PostId`), INDEX `IDX_ae24f9fe95687324e13c1053f7` (`sample4PostAuthorId`), PRIMARY KEY (`sample4PostId`, `sample4PostAuthorId`)) ENGINE=InnoDB
ALTER TABLE `sample4_post_categories_sample4_post_category` ADD CONSTRAINT `FK_c8baf411d7cf2ef20baeb2e41d0` FOREIGN KEY (`sample4PostId`) REFERENCES `sample4_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_categories_sample4_post_category` ADD CONSTRAINT `FK_0e4c5f8c8fa7c3446579523438a` FOREIGN KEY (`sample4PostCategoryId`) REFERENCES `sample4_post_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_details_sample4_post_details` ADD CONSTRAINT `FK_e70c862c483fbf36a629ead03c3` FOREIGN KEY (`sample4PostId`) REFERENCES `sample4_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_details_sample4_post_details` ADD CONSTRAINT `FK_15f9eecbcfcf9c3f824f8cc3aaf` FOREIGN KEY (`sample4PostDetailsId`) REFERENCES `sample4_post_details`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_images_sample4_post_image` ADD CONSTRAINT `FK_4d73c374a61398dcfd491d6e990` FOREIGN KEY (`sample4PostId`) REFERENCES `sample4_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_images_sample4_post_image` ADD CONSTRAINT `FK_3c919026fcd57d50ac797c292ea` FOREIGN KEY (`sample4PostImageId`) REFERENCES `sample4_post_image`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_metadatas_sample4_post_metadata` ADD CONSTRAINT `FK_f3e27d068f03ed5c25ec4d43c21` FOREIGN KEY (`sample4PostId`) REFERENCES `sample4_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_metadatas_sample4_post_metadata` ADD CONSTRAINT `FK_69752de4f4d134655a6105d0d28` FOREIGN KEY (`sample4PostMetadataId`) REFERENCES `sample4_post_metadata`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_informations_sample4_post_information` ADD CONSTRAINT `FK_e6c3630d97998019568f52da175` FOREIGN KEY (`sample4PostId`) REFERENCES `sample4_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_informations_sample4_post_information` ADD CONSTRAINT `FK_a9563e630f97be86c8fce797e09` FOREIGN KEY (`sample4PostInformationId`) REFERENCES `sample4_post_information`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_authors_sample4_post_author` ADD CONSTRAINT `FK_4cec9ca9d8e1614bd1c979110db` FOREIGN KEY (`sample4PostId`) REFERENCES `sample4_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
ALTER TABLE `sample4_post_authors_sample4_post_author` ADD CONSTRAINT `FK_ae24f9fe95687324e13c1053f7a` FOREIGN KEY (`sample4PostAuthorId`) REFERENCES `sample4_post_author`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION

*/
