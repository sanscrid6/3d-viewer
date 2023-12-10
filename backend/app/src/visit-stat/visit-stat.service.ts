import { Injectable } from '@nestjs/common';
import { CreateVisitStatDto } from './dto/create-visit-stat.dto';
import { UpdateVisitStatDto } from './dto/update-visit-stat.dto';

@Injectable()
export class VisitStatService {
  create(createVisitStatDto: CreateVisitStatDto) {
    return 'This action adds a new visitStat';
  }

  findAll() {
    return `This action returns all visitStat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} visitStat`;
  }

  update(id: number, updateVisitStatDto: UpdateVisitStatDto) {
    return `This action updates a #${id} visitStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} visitStat`;
  }
}
