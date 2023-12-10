import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DurationStat } from './entities/duration-stat.entity';

@Injectable()
export class DurationStatRepository extends Repository<DurationStat> {
  constructor(
    @InjectRepository(DurationStat)
    repository: Repository<DurationStat>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
