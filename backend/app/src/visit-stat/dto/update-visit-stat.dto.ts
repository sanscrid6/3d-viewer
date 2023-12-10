import { PartialType } from '@nestjs/swagger';
import { CreateVisitStatDto } from './create-visit-stat.dto';

export class UpdateVisitStatDto extends PartialType(CreateVisitStatDto) {}
