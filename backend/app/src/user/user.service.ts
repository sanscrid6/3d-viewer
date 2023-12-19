import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaymentRepository } from 'src/payment/payment.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

  @Inject()
  private readonly paymentRepository: PaymentRepository;

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findOneByOrFail({ id });
    user.hashes.push(dto.hash);

    return this.userRepository.update(id, user);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async checkPendingPayments() {
    const users = await this.userRepository.getUsersWithPendingTransactions();
    for (const user of users) {
      const hashes = new Set(user.hashes);
      user.balance = Number(user.balance);
      for (const hash of user.hashes) {
        try {
          const payment = await this.paymentRepository.findOne({
            where: { hash },
          });

          user.balance += +payment.amount;
          hashes.delete(hash);
        } catch (error) {}
      }

      user.hashes = [...hashes];
      await this.userRepository.update(user.id, user);
    }
  }
}
