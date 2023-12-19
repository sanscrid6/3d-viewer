import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    repository: Repository<User>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async getUsersWithPendingTransactions() {
    const q = this.createQueryBuilder('user')
      .select('*')
      .where('cardinality("user"."hashes") > 0');

    return q.execute() as Promise<User[]>;
  }
}
