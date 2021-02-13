import { EntityRepository } from 'typeorm';
import { EntityManager } from 'typeorm';
import { User } from '../entity/User';

/**
 * Third type of custom repository - extends nothing and accepts entity manager as a first constructor parameter.
 */
@EntityRepository()
export class UserRepository {
  constructor(private manager: EntityManager) {}

  async createAndSave(firstName: string, lastName: string): Promise<User> {
    const user = this.manager.create(User, { firstName, lastName });
    return await this.manager.save(user);
  }

  async findByName(firstName: string, lastName: string) {
    return this.manager
      .createQueryBuilder(User, 'user')
      .where('user.firstName = :firstName AND user.lastName = :lastName')
      .setParameters({ firstName, lastName })
      .getOne();
  }
}
