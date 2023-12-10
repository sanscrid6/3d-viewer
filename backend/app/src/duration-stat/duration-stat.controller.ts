import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DurationStatService } from './duration-stat.service';
import { CreateDurationStatDto } from './dto/create-duration-stat.dto';
import { Public } from 'src/auth/public.guard';

@Controller('duration-stat')
export class DurationStatController {
  constructor(private readonly durationStatService: DurationStatService) {}

  @Post()
  @Public()
  create(@Body() createDurationStatDto: CreateDurationStatDto) {
    return this.durationStatService.create(createDurationStatDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.durationStatService.getLocationStat(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.durationStatService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDurationStatDto: UpdateDurationStatDto) {
  //   return this.durationStatService.update(+id, updateDurationStatDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.durationStatService.remove(+id);
  // }
}
