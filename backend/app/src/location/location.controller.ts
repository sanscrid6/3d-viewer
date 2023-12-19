import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { RequestUserInfo, User } from 'src/user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Public } from 'src/auth/public.guard';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(
    @Body() createLocationDto: CreateLocationDto,
    @User() user: RequestUserInfo,
  ) {
    return this.locationService.create(createLocationDto, user);
  }

  @Get()
  findAll(@User() user: RequestUserInfo) {
    return this.locationService.findAll(user);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
    @User() user: RequestUserInfo,
  ) {
    return this.locationService.update(id, user.id, updateLocationDto);
  }

  @Post('/archive/:id')
  @UseInterceptors(FileInterceptor('archive'))
  updateArchive(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.locationService.updateArchive(id, file);
  }

  @Post('/preview/:id')
  @UseInterceptors(FileInterceptor('image'))
  uploadPreview(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.locationService.uploadPreview(id, file);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.locationService.remove(+id);
  // }
}
