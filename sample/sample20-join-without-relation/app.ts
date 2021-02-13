import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { Author } from './entity/Author';
import { Category } from './entity/Category';

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
  entities: [Post, Author, Category],
};

createConnection(options).then(
  (connection) => {
    const entityManager = connection.manager;

    const postRepository = connection.getRepository(Post);
    const authorRepository = connection.getRepository(Author);
    const categoryRepository = connection.getRepository(Category);

    const category1 = categoryRepository.create();
    category1.name = 'Hello category1';

    const category2 = categoryRepository.create();
    category2.name = 'Bye category2';

    const author = authorRepository.create();
    author.name = 'Umed';

    const post = postRepository.create();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.authorId = 1;
    // post.author = author;
    post.categories = [category1, category2];

    Promise.all<any>([
      authorRepository.save(author),
      categoryRepository.save(category1),
      categoryRepository.save(category2),
    ])
      .then(() => {
        return postRepository.save(post);
      })
      .then(() => {
        console.log('Everything has been saved.');
      })
      .then(() => {
        return postRepository
          .createQueryBuilder('post')
          .leftJoinAndMapMany('post.superCategories', 'post.categories', 'categories')
          .leftJoinAndMapOne('post.author', Author, 'author', 'author.id=post.authorId')
          .getMany();
      })
      .then((posts) => {
        console.log('Loaded posts: ', posts);

        return entityManager.createQueryBuilder(Author, 'author').getMany();
      })
      .then((authors) => {
        console.log('Loaded authors: ', authors);
      })
      /*    posts[0].title = "should be updated second post";

        return author.posts.then(posts => {
                return authorRepository.save(author);
            });
        })
        .then(updatedAuthor => {
            console.log("Author has been updated: ", updatedAuthor);
            console.log("Now lets load all posts with their authors:");
            return postRepository.find({ alias: "post", leftJoinAndSelect: { author: "post.author" } });
        })
        .then(posts => {
            console.log("Posts are loaded: ", posts);
            console.log("Now lets delete a post");
            posts[0].author = Promise.resolve(null);
            posts[1].author = Promise.resolve(null);
            return postRepository.save(posts[0]);
        })
        .then(posts => {
            console.log("Two post's author has been removed.");
            console.log("Now lets check many-to-many relations");

            let category1 = categoryRepository.create();
            category1.name = "Hello category1";

            let category2 = categoryRepository.create();
            category2.name = "Bye category2";

            let post = postRepository.create();
            post.title = "Post & Categories";
            post.text = "Post with many categories";
            post.categories = Promise.resolve([
                category1,
                category2
            ]);

            return postRepository.save(post);
        })
        .then(posts => {
            console.log("Post has been saved with its categories. ");
            console.log("Lets find it now. ");
            return postRepository.find({ alias: "post", innerJoinAndSelect: { categories: "post.categories" } });
        })
        .then(posts => {
            console.log("Post with categories are loaded: ", posts);
            console.log("Lets remove one of the categories: ");
            return posts[0].categories.then(categories => {
                categories.splice(0, 1);
                // console.log(posts[0]);
                return postRepository.save(posts[0]);
            });
        })*/
      .then((posts) => {
        // console.log("One of the post category has been removed.");
      })
      .catch((error) => console.log(error.stack));
  },
  (error) => console.log('Cannot connect: ', error)
);
/*
uery: CREATE TABLE `sample20_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample20_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample20_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample20_post_categories_sample20_category` (`sample20PostId` int NOT NULL, `sample20CategoryId` int NOT NULL, INDEX `IDX_dddfe5b7e98b2bee8310953ea1` (`sample20PostId`), INDEX `IDX_45fd628abc6de2c7ada50d610a` (`sample20CategoryId`), PRIMARY KEY (`sample20PostId`, `sample20CategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample20_post_categories_sample20_category` ADD CONSTRAINT `FK_dddfe5b7e98b2bee8310953ea1f` FOREIGN KEY (`sample20PostId`) REFERENCES `sample20_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample20_post_categories_sample20_category` ADD CONSTRAINT `FK_45fd628abc6de2c7ada50d610a9` FOREIGN KEY (`sample20CategoryId`) REFERENCES `sample20_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION

*/
