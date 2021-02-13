import 'reflect-metadata';
import { ConnectionOptions, createConnection } from 'typeorm';
import { Post } from './entity/Post';
import { PostDetails } from './entity/PostDetails';
import { Image } from './entity/Image';
import { Cover } from './entity/Cover';
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
  entities: [__dirname + '/entity/*'],
};

createConnection(options)
  .then((connection) => {
    const postRepository = connection.getRepository(Post);

    const postCover = new Cover();
    postCover.url = 'http://covers.com/post.jpg';

    const details = new PostDetails();
    details.meta = 'hello';
    details.comment = 'wow';

    const category1 = new Category();
    category1.description = 'about post1';

    const category2 = new Category();
    category2.description = 'about post2';

    const image = new Image();
    image.name = 'post.jpg';

    const post = new Post();
    post.title = 'Hello post';
    post.text = 'Hello world of post#1';
    post.cover = postCover;
    post.details = details;
    post.images = [];
    post.images.push(image);
    post.categories = [category1, category2];

    postRepository
      .save(post)
      .then((result) => {
        /*const qb = postRepository.createQueryBuilder("post")
            .leftJoinAndSelect("post.details", "details")
            .leftJoinAndSelect("post.images", "images")
           // .leftJoinAndSelect("post.coverId", "coverId")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.id=:id")
            .setParameter("id", 6);

        return qb
            .getSingleResult()
            .then(post => {
                console.log("loaded post: ", post);

                let category1 = new Category();
                category1.id = 12;
                category1.description = "about cat#12";

                let category2 = new Category();
                category2.id = 52;
                category2.description = "about cat#52";

                let image = new Image();
                image.name = "second image of the post";

                //post
                post.title = "This! is updated post$";
                post.text = "Hello world of post#4";
                post.categories = [category2, category1];
                post.images = [];
                post.images.push(image);
                return postRepository.save(post);

            })
            .then(() => qb.getSingleResult())
            .then(reloadedPost => console.log("reloadedPost: ", reloadedPost));*/
      })
      .then((result) => console.log(result))
      .catch((error) => console.log(error.stack ? error.stack : error));

    return;

    /*const postJson = {
        id: 1,  // changed
        text: "This is post about hello", // changed
        title: "hello", // changed
        details: { // new relation added
            id: 10, // new object persisted
            comment: "This is post about hello",
            meta: "about-hello!",
            chapter: {
                id: 1, // new object persisted
                about: "part I"
            },
            categories: [{
                id: 5, // new object persisted
                description: "cat5"
            }]
        },
        cover: null, // relation removed
        images: [{  // new relation added
            id: 4, // new object persisted
            name: "post!.jpg",
            secondaryPost: {
                id: 2,
                title: "secondary post"
            }
        }, { // secondaryPost relation removed
            id: 3,
            name: "post_2!.jpg", // changed
            details: { // new relation added
                id: 3, // new object persisted
                meta: "sec image",
                comment: "image sec"
            }
        }],
        categories: [{ // two categories removed, new category added
            id: 4, // new persisted
            description: "cat2"
        }]
    };

    let entity = postRepository.create(postJson);
    return postRepository.initialize(postJson)
        .then(result => {
            const mergedEntity = postRepository.merge(result, entity);
            console.log("entity created from json: ", entity);
            console.log("entity initialized from db: ", result);
            console.log("entity merged: ", mergedEntity);
            const diff = postRepository.difference(result, mergedEntity);
            console.log("diff: ", diff);
           //console.log("diff[0]: ", diff[0].removedRelations);
        })
        .catch(error => console.log(error.stack ? error.stack : error));

    let qb = postRepository
        .createQueryBuilder("post")
        .addSelect("cover")
        .addSelect("image")
        .addSelect("imageDetails")
        .addSelect("secondaryImage")
        .addSelect("category")
        .innerJoin("post.coverId", "cover")
        .leftJoin("post.images", "image")
        .leftJoin("post.secondaryImages", "secondaryImage")
        .leftJoin("image.details", "imageDetails", "on", "imageDetails.meta=:meta")
        .leftJoin("post.categories", "category", "on", "category.description=:description")
        //.leftJoin(Image, "image", "on", "image.post=post.id")
        //.where("post.id=:id")
        .setParameter("id", 1)
        .setParameter("description", "cat2")
        .setParameter("meta", "sec image");

    return qb
        .getSingleResult()
        .then(post => console.log(post))
        // .then(result => console.log(JSON.stringify(result, null, 4)))
        .catch(error => console.log(error.stack ? error.stack : error));*/

    /*let details = new PostDetails();
    details.comment = "This is post about hello";
    details.meta = "about-hello";

    const post = new Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    //post.details = details;

    postRepository
        .save(post)
        .then(post => console.log("Post has been saved"))
        .catch(error => console.log("Cannot save. Error: ", error));*/
  })
  .catch((error) => console.log(error.stack ? error.stack : error));

/*
query: CREATE TABLE `sample10_image_details` (`id` int NOT NULL AUTO_INCREMENT, `meta` varchar(255) NOT NULL, `comment` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample10_image` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `postId` int NULL, `secondaryPostId` int NULL, `detailsId` int NULL, UNIQUE INDEX `REL_b9adeac5a479de4b6fe6b153cc` (`detailsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample10_cover` (`id` int NOT NULL AUTO_INCREMENT, `url` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample10_chapter` (`id` int NOT NULL AUTO_INCREMENT, `about` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample10_post_details` (`id` int NOT NULL AUTO_INCREMENT, `meta` varchar(255) NOT NULL, `comment` varchar(255) NOT NULL, `chapterId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample10_category` (`id` int NOT NULL AUTO_INCREMENT, `description` varchar(255) NOT NULL, `detailsId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample10_post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `text` varchar(255) NOT NULL, `coverId` int NULL, `detailsId` int NULL, UNIQUE INDEX `REL_07b8199ff9a376fa80ed50efc9` (`detailsId`), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: CREATE TABLE `sample10_post_categories_sample10_category` (`sample10PostId` int NOT NULL, `sample10CategoryId` int NOT NULL, INDEX `IDX_f58c11519ab012832088345d49` (`sample10PostId`), INDEX `IDX_1d7defb5f0009304509d7e58cd` (`sample10CategoryId`), PRIMARY KEY (`sample10PostId`, `sample10CategoryId`)) ENGINE=InnoDB
query: ALTER TABLE `sample10_image` ADD CONSTRAINT `FK_e26b5eaaef6a9d4fe693c37efba` FOREIGN KEY (`postId`) REFERENCES `sample10_post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample10_image` ADD CONSTRAINT `FK_fbbd1b1c08da1dae6440c953be5` FOREIGN KEY (`secondaryPostId`) REFERENCES `sample10_post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample10_image` ADD CONSTRAINT `FK_b9adeac5a479de4b6fe6b153cc5` FOREIGN KEY (`detailsId`) REFERENCES `sample10_image_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample10_post_details` ADD CONSTRAINT `FK_8059521cffe7c7cf88afd48c7a9` FOREIGN KEY (`chapterId`) REFERENCES `sample10_chapter`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample10_category` ADD CONSTRAINT `FK_ee1e7702c368cee26bfa01ad540` FOREIGN KEY (`detailsId`) REFERENCES `sample10_post_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample10_post` ADD CONSTRAINT `FK_07b8199ff9a376fa80ed50efc92` FOREIGN KEY (`detailsId`) REFERENCES `sample10_post_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample10_post` ADD CONSTRAINT `FK_75ff3544fb1af818a5a11a252e2` FOREIGN KEY (`coverId`) REFERENCES `sample10_cover`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
query: ALTER TABLE `sample10_post_categories_sample10_category` ADD CONSTRAINT `FK_f58c11519ab012832088345d49b` FOREIGN KEY (`sample10PostId`) REFERENCES `sample10_post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
query: ALTER TABLE `sample10_post_categories_sample10_category` ADD CONSTRAINT `FK_1d7defb5f0009304509d7e58cda` FOREIGN KEY (`sample10CategoryId`) REFERENCES `sample10_category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION
*/
