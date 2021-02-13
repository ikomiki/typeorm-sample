import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { Author } from './entity/Author';

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
  entities: [Post, Author],
};

createConnection(options).then(
  (connection) => {
    const postRepository = connection.getRepository(Post);
    const authorRepository = connection.getRepository(Author);

    const authorPromise = authorRepository.findOne(1).then((author) => {
      if (!author) {
        author = new Author();
        author.name = 'Umed';
        return authorRepository.save(author).then((savedAuthor) => {
          return authorRepository.findOne(1);
        });
      }
      return author;
    });

    const postPromise = postRepository.findOne(1).then((post) => {
      if (!post) {
        post = new Post();
        post.title = 'Hello post';
        post.text = 'This is post contents';
        return postRepository.save(post).then((savedPost) => {
          return postRepository.findOne(1);
        });
      }
      return post;
    });

    return Promise.all<any>([authorPromise, postPromise])
      .then((results) => {
        const [author, post] = results;
        author.posts = [post];
        return authorRepository.save(author);
      })
      .then((savedAuthor) => {
        console.log('Author has been saved: ', savedAuthor);
      })
      .catch((error) => console.log(error.stack));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
uery : CREATE TABLE `sample25_author`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB query : CREATE TABLE `sample25_post`(
    `id` int NOT NULL AUTO_INCREMENT,
    `title` varchar(255) NOT NULL,
    `text` varchar(255) NOT NULL,
    `authorId` int NULL,
    PRIMARY KEY(`id`)
) ENGINE = InnoDB query : ALTER TABLE `sample25_post` ADD CONSTRAINT `FK_2b00c5b4d1b12c51b4e88127c39` FOREIGN KEY(
    `authorId`
) REFERENCES `sample25_author`(
    `id`
)
ON  DELETE NO ACTION
ON
    UPDATE
        NO ACTION
*/
