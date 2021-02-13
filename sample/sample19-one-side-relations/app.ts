import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { Author } from './entity/Author';
import { Category } from './entity/Category';
import { PostMetadata } from './entity/PostMetadata';

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
  entities: [Post, Author, Category, PostMetadata],
};

createConnection(options).then(
  (connection) => {
    const postRepository = connection.getRepository(Post);
    const authorRepository = connection.getRepository(Author);
    const categoryRepository = connection.getRepository(Category);
    const metadataRepository = connection.getRepository(PostMetadata);

    const category1 = categoryRepository.create();
    category1.name = 'Hello category1';

    const category2 = categoryRepository.create();
    category2.name = 'Bye category2';

    const author = authorRepository.create();
    author.name = 'Umed';

    const metadata = metadataRepository.create();
    metadata.comment = 'Metadata about post';

    const post = postRepository.create();
    post.text = 'Hello how are you?';
    post.title = 'hello';
    post.author = author;
    post.metadata = metadata;
    post.categories = [category1, category2];

    postRepository
      .save(post)
      .then((post) => {
        console.log('Post has been saved.');
        console.log(post);

        console.log('Now lets load posts with all their relations:');
        return postRepository.find({
          join: {
            alias: 'post',
            leftJoinAndSelect: {
              author: 'post.author',
              metadata: 'post.metadata',
              categories: 'post.categories',
            },
          },
        });

        // let secondPost = postRepository.create();
        // secondPost.text = "Second post";
        // secondPost.title = "About second post";
        // return authorRepository.save(author);
      })
      .then((post) => {
        console.log('Loaded posts: ', post);
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
query: CREATE TABLE `sample19_author` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample19_category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample19_post_metadata` (`id` int NOT NULL AUTO_INCREMENT, `comment` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample19_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `authorId` int NULL, `metadataId` int NULL, UNIQUE INDEX `REL_50c33836a4fe1d595de7550067` (`metadataId`), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample19_post_categories_sample19_category` (`sample19PostId` int NOT NULL, `sample19CategoryId` int NOT NULL, INDEX `IDX_9c61c23989b0f94a76e01e1a40` (`sample19PostId`), INDEX `IDX_46f299cba8f9dec0d369843c1a` (`sample19CategoryId`), PRIMARY KEY (`sample19PostId`, `sample19CategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample19_post` ADD CONSTRAINT `FK_c278895a7893262f22737f5e96c` FOREIGN KEY (`authorId`) REFERENCES `sample19_author`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample19_post` ADD CONSTRAINT `FK_50c33836a4fe1d595de75500675` FOREIGN KEY (`metadataId`) REFERENCES `sample19_post_metadata`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample19_post_categories_sample19_category` ADD CONSTRAINT `FK_9c61c23989b0f94a76e01e1a407` FOREIGN KEY (`sample19PostId`) REFERENCES `sample19_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample19_post_categories_sample19_category` ADD CONSTRAINT `FK_46f299cba8f9dec0d369843c1aa` FOREIGN KEY (`sample19CategoryId`) REFERENCES `sample19_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION

*/
