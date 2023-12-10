import { Inject, Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationRepository } from './location.repository';
import { RequestUserInfo } from 'src/user/user.decorator';
import * as AdmZip from 'adm-zip';
import { UserRepository } from 'src/user/user.repository';
import { FileService } from 'src/utils/file.service';
import { CustomException } from 'src/utils/custom-exeption';
import { Gltf } from './types';
import { join } from 'path';
import { PointRepository } from 'src/point/point.repository';

@Injectable()
export class LocationService {
  @Inject()
  private readonly locationRepository: LocationRepository;

  @Inject()
  private readonly userRepository: UserRepository;

  @Inject()
  private readonly fileService: FileService;

  @Inject()
  private readonly pointRepository: PointRepository;

  private readonly filesToWrite = [
    {
      name: /cube\/\d+_cube/,
    },
    {
      name: /location.gltf/,
    },
    {
      name: /location.bin/,
    },
    {
      name: /mesh\d.jpg/,
    },
  ];

  async create(
    createLocationDto: CreateLocationDto,
    userInfo: RequestUserInfo,
  ) {
    const user = await this.userRepository.findOneByOrFail({ id: userInfo.id });

    const location = await this.locationRepository.save({
      name: createLocationDto.name,
      description: createLocationDto.description,
      user: user,
    });

    return location;
  }

  findAll(user: RequestUserInfo) {
    return this.locationRepository.find({ where: { user: { id: user.id } } });
  }

  findOne(id: string) {
    return this.locationRepository.findOne({
      where: { id },
      relations: { points: true },
    });
  }

  update(id: string, updateLocationDto: UpdateLocationDto) {
    return this.locationRepository.update(
      { id },
      {
        name: updateLocationDto.name,
        description: updateLocationDto.description,
      },
    );
  }

  async updateArchive(id: string, file: Express.Multer.File) {
    try {
      const location = await this.locationRepository.findOneByOrFail({ id });
      await this.pointRepository.delete({ location });
      await this.fileService.deleteMediaFolder(location.id);
      await this.locationRepository.update({ id }, { previewUrl: '' });

      const zip = new AdmZip(file.buffer);
      const entries = zip.getEntries();

      const l = entries.find((e) => e.entryName.endsWith('location.gltf'));
      const data = l.getData();
      const json = JSON.parse(data.toString()) as Gltf;

      const points = json.nodes.filter((n) => n.name.startsWith('Sphere'));

      await Promise.all(
        points.map((p) =>
          this.pointRepository.save({
            x: +p.translation[0],
            y: +p.translation[1],
            z: +p.translation[2],
            number: +p.name.slice(6),
            location,
          }),
        ),
      );

      for (const e of entries) {
        for (const f of this.filesToWrite) {
          if (e.entryName.match(f.name)) {
            const data = e.getData();
            await this.fileService.writeMedia(
              join(location.id, e.entryName),
              data,
            );
          }
        }
      }
    } catch (error) {
      throw new CustomException((error as { message: string }).message);
    }
  }

  async uploadPreview(id: string, file: Express.Multer.File) {
    try {
      const previewUrl = join(
        id,
        `preview.${file.originalname.split('.').at(-1)}`,
      );

      await this.fileService.writeMedia(previewUrl, file.buffer);
      await this.locationRepository.update({ id }, { previewUrl });
    } catch (error) {
      throw new CustomException((error as { message: string }).message);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
