import { Module } from '@nestjs/common';
import { DurationStatService } from './duration-stat.service';
import { DurationStatController } from './duration-stat.controller';

@Module({
  controllers: [DurationStatController],
  providers: [DurationStatService],
})
export class DurationStatModule {}
