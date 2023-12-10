import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VisitStatService } from './visit-stat.service';
import { CreateVisitStatDto } from './dto/create-visit-stat.dto';
import { UpdateVisitStatDto } from './dto/update-visit-stat.dto';

@Controller('visit-stat')
export class VisitStatController {
  constructor(private readonly visitStatService: VisitStatService) {}

  @Post()
  create(@Body() createVisitStatDto: CreateVisitStatDto) {
    return this.visitStatService.create(createVisitStatDto);
  }

  @Get()
  findAll() {
    return this.visitStatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitStatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitStatDto: UpdateVisitStatDto) {
    return this.visitStatService.update(+id, updateVisitStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitStatService.remove(+id);
  }
}
