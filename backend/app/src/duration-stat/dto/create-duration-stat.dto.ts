import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDurationStatDto {
  @IsString()
  @ApiProperty()
  locationId: string;

  @IsNumber()
  @ApiProperty()
  pointNumber: number;

  @IsNumber()
  @ApiProperty()
  duration: number;
}
