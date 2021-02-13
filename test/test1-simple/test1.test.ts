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
  logging: ['warn', 'error'],
  synchronize: true,
  entities: [Post],
};

describe('test01-simple', () => {
  it('should make source entity and saved entity even', async () => {
    const connection = await createConnection(options);
    try {
      const post = new Post();
      post.text = 'Hello how are you?';
      post.title = 'hello';
      post.likesCount = 100;

      const postRepository = connection.getRepository(Post);
      const saved = await postRepository.save(post);
      expect(saved.text).toEqual(post.text);
      expect(saved.title).toEqual(post.title);
      expect(saved.likesCount).toEqual(post.likesCount);
      const finded = await postRepository.findOne(saved.id);
      expect(finded).toEqual(saved);
    } finally {
      await connection.close();
    }
  });
});
