import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { FileService } from 'src/utils/file.service';
import { LocationRepository } from './location.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { UserModule } from 'src/user/user.module';
import { PointModule } from 'src/point/point.module';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), UserModule, PointModule],
  controllers: [LocationController],
  providers: [
    LocationService,
    { provide: FileService, useClass: FileService },
    LocationRepository,
  ],
  exports: [LocationRepository],
})
export class LocationModule {}
