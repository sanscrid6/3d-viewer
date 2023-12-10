import { Module } from '@nestjs/common';
import { DurationStatService } from './duration-stat.service';
import { DurationStatController } from './duration-stat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DurationStat } from './entities/duration-stat.entity';
import { PointModule } from 'src/point/point.module';
import { DurationStatRepository } from './duration-stat.repository';
import { VisitStat } from './entities/visit-stat.entity';
import { VisitStatRepository } from './visit-stat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DurationStat, VisitStat]), PointModule],
  controllers: [DurationStatController],
  providers: [DurationStatService, DurationStatRepository, VisitStatRepository],
})
export class DurationStatModule {}
