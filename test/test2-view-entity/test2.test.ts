import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Category } from './entity/Category';
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
  entities: [Post, Category],
};

describe('test02-simple', () => {
  it('should save OneToMany entity', async () => {
    const connection = await createConnection(options);
    try {
      const category1 = new Category();
      category1.description = 'category description 1';
      const category2 = new Category();
      category2.description = 'category description 2';
      const post = new Post();
      post.text = 'Hello how are you?';
      post.title = 'hello';
      post.categories = [category1, category2];

      const postRepository = connection.getRepository(Post);
      const savedPost = await postRepository.save(post);
      expect(savedPost.text).toEqual(post.text);
      expect(savedPost.title).toEqual(post.title);
      expect(savedPost.categories[0].description).toEqual(category1.description);
      expect(savedPost.categories[0].description).toEqual(category1.description);
      expect(savedPost.categories[1].description).toEqual(category2.description);
      expect(savedPost.categories[1].description).toEqual(category2.description);

      const categoryRepository = connection.getRepository(Category);
      const findedCategory = await categoryRepository.findOne(savedPost.categories[0].id);
      expect(findedCategory.description).toEqual(savedPost.categories[0].description);
      expect(findedCategory.post).toBeUndefined();

      const findedCategory2 = await categoryRepository.findOne(savedPost.categories[0].id, {
        relations: ['post'],
      });
      expect(findedCategory2.description).toEqual(savedPost.categories[0].description);
      expect(findedCategory2.post).toBeDefined();
    } finally {
      await connection.close();
    }
  });
});
