import { Inject, Injectable } from '@nestjs/common';
import { CreateDurationStatDto } from './dto/create-duration-stat.dto';
import { UpdateDurationStatDto } from './dto/update-duration-stat.dto';
import { DurationStatRepository } from './duration-stat.repository';
import { PointRepository } from 'src/point/point.repository';
import { VisitStatRepository } from './visit-stat.repository';

@Injectable()
export class DurationStatService {
  @Inject()
  private readonly durationStatRepository: DurationStatRepository;

  @Inject()
  private readonly pointRepository: PointRepository;

  @Inject()
  private readonly visitStateRepository: VisitStatRepository;

  async create(createDurationStatDto: CreateDurationStatDto) {
    const point = await this.pointRepository.findOneOrFail({
      where: {
        location: {
          id: createDurationStatDto.locationId,
        },
        number: createDurationStatDto.pointNumber,
      },
    });

    await this.durationStatRepository.save({
      point,
      timestamp: new Date(),
      duration: createDurationStatDto.duration,
    });

    await this.visitStateRepository.save({
      point,
      timestamp: new Date(),
    });
  }

  async getLocationStat(locationId: string) {
    const sumDuration = await this.durationStatRepository.sum('duration', {
      point: { location: { id: locationId } },
    });

    const unique = await this.visitStateRepository.count({
      where: { point: { location: { id: locationId } } },
    });

    return { unique, sumDuration };
  }
}
