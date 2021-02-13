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
  logging: ['query', 'error', 'log'],
  synchronize: true,
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
      .then((post) => {
        console.log(`Post has been saved: `, post);
        console.log(`Post's version is ${post.version}. Lets change post's text and update it:`);
        post.title = 'updating title';
        return postRepository.save(post);
      })
      .then((post) => {
        console.log(`Post has been updated. Post's version is ${post.version}`);
      });
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
CREATE TABLE `sample17_post`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `text` varchar(255) NOT NULL,
    `version` int NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB
 */
