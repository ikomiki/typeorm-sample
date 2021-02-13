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
  async (connection) => {
    const postRepository = connection.getRepository(Post);

    const post = new Post();
    post.id = 1;
    post.type = 'person';
    post.text = 'this is test post!';

    console.log('saving the post: ');
    await postRepository.save(post);
    console.log('Post has been saved: ', post);

    console.log('now loading the post: ');
    const loadedPost = await postRepository.findOne({ id: 1, type: 'person' });
    console.log('loaded post: ', loadedPost);
  },
  (error) => console.log('Error: ', error)
);
/*
query: CREATE TABLE `sample27_composite_primary_keys` (`id` int NOT NULL, `type` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, PRIMARY KEY (`id`, `type`)) ENGINE=InnoDB
*/
