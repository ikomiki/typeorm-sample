import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { CustomNamingStrategy } from './naming-strategy/CustomNamingStrategy';

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
  namingStrategy: new CustomNamingStrategy(),
  entities: [Post],
};

createConnection(options).then(
  (connection) => {
    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';

    const postRepository = connection.getRepository(Post);

    postRepository
      .save(post)
      .then((post) => console.log('Post has been saved'))
      .catch((error) => console.log('Cannot save. Error: ', error));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
query : CREATE TABLE `sample1_post`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `text` varchar(255) NOT NULL,
    `likes_count` int NOT NULL DEFAULT '0',
    PRIMARY KEY(`id`)
) ENGINE = InnoDB
*/
