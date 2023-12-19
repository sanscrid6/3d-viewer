import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentRepository extends Repository<Payment> {
  constructor(
    @InjectRepository(Payment)
    repository: Repository<Payment>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
