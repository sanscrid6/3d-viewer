import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VisitStat } from './entities/visit-stat.entity';

@Injectable()
export class VisitStatRepository extends Repository<VisitStat> {
  constructor(
    @InjectRepository(VisitStat)
    repository: Repository<VisitStat>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
