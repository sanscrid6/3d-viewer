import { PartialType } from '@nestjs/swagger';
import { CreateDurationStatDto } from './create-duration-stat.dto';

export class UpdateDurationStatDto extends PartialType(CreateDurationStatDto) {}
