import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Request } from 'express';
import axios from 'axios';
import { PaymentNotification, ExchangeResponse } from './types';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  @Inject()
  private readonly paymentRepository: PaymentRepository;

  async create(req: Request) {
    const data = req.body as PaymentNotification;

    for (const event of data.event.activity) {
      const price = event.value;
      const from = event.fromAddress;
      const to = event.toAddress;
      const asset = event.asset;
      const hash = event.hash;
      // console.log(price, asset);

      if (asset !== 'ETH') continue;

      const res = await axios<ExchangeResponse[]>(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum`,
      );

      const rate = res.data[0].current_price;

      const usdPrice = price * rate;

      // console.log(usdPrice, asset);
      await this.paymentRepository.save({
        from,
        to,
        hash,
        amount: usdPrice,
      });
    }
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
