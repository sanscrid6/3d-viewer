import { Injectable } from '@nestjs/common';
import { CreateDurationStatDto } from './dto/create-duration-stat.dto';
import { UpdateDurationStatDto } from './dto/update-duration-stat.dto';

@Injectable()
export class DurationStatService {
  create(createDurationStatDto: CreateDurationStatDto) {
    return 'This action adds a new durationStat';
  }

  findAll() {
    return `This action returns all durationStat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} durationStat`;
  }

  update(id: number, updateDurationStatDto: UpdateDurationStatDto) {
    return `This action updates a #${id} durationStat`;
  }

  remove(id: number) {
    return `This action removes a #${id} durationStat`;
  }
}
