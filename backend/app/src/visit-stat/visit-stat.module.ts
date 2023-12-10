import { Module } from '@nestjs/common';
import { VisitStatService } from './visit-stat.service';
import { VisitStatController } from './visit-stat.controller';

@Module({
  controllers: [VisitStatController],
  providers: [VisitStatService],
})
export class VisitStatModule {}
