import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DurationStatService } from './duration-stat.service';
import { CreateDurationStatDto } from './dto/create-duration-stat.dto';
import { UpdateDurationStatDto } from './dto/update-duration-stat.dto';

@Controller('duration-stat')
export class DurationStatController {
  constructor(private readonly durationStatService: DurationStatService) {}

  @Post()
  create(@Body() createDurationStatDto: CreateDurationStatDto) {
    return this.durationStatService.create(createDurationStatDto);
  }

  @Get()
  findAll() {
    return this.durationStatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.durationStatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDurationStatDto: UpdateDurationStatDto) {
    return this.durationStatService.update(+id, updateDurationStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.durationStatService.remove(+id);
  }
}
