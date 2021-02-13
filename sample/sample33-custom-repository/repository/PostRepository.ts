import { Repository } from 'typeorm';
import { Post } from '../entity/Post';
import { EntityRepository } from 'typeorm';

/**
 * Second type of custom repository - extends standard repository.
 */
@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  findMyPost() {
    return this.findOne();
  }
}
