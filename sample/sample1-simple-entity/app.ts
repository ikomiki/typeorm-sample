import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';

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
  entities: [Post],
};

createConnection(options).then(
  async (connection) => {
    const post = new Post();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.likesCount = 100;

    const postRepository = connection.getRepository(Post);

    return postRepository
      .save(post)
      .then((post) => console.log('Post has been saved: ', post))
      .catch((error) => console.log('Cannot save. Error: ', error));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
CREATE TABLE `sample01_post`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `text` varchar(255) NOT NULL,
    `likesCount` int NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB
*/
