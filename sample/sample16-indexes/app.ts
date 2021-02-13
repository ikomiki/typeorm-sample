import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { BasePost } from './entity/BasePost';

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
  entities: [Post, BasePost],
};

createConnection(options).then(
  (connection) => {
    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.likesCount = 0;

    const postRepository = connection.getRepository(Post);

    postRepository.save(post).then((post) => console.log('Post has been saved'));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
CREATE TABLE `sample16_post`(
    `id` int NOT NULL AUTO_INCREMENT,
    `text` varchar(255) NOT NULL,
    `extra` varchar(255) NOT NULL DEFAULT '',
    `title` varchar(255) NOT NULL,
    `likesCount` int NOT NULL,
    INDEX `IDX_d77dd47e5227ef01ec4fe821e7`(`extra`),
    INDEX `my_index_with_id_and_text`(`id`, `text`),
    INDEX `IDX_09d84ffdce53c28cbd9d8d76a0`(`title`),
    INDEX `IDX_73ec680d578d0eea6e96db9dfe`(`likesCount`),
    INDEX `my_index_with_id_and_title`(`id`, `title`),
    UNIQUE INDEX `IDX_d4bc655e5d1e1617bac553e828`(`text`),
    PRIMARY KEY(`id`)
) ENGINE = InnoDB
*/
