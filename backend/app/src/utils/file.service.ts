import { Injectable } from '@nestjs/common';
import { BinaryLike } from 'crypto';
import { join, sep } from 'path';
import { access, mkdir, writeFile, unlink, rm } from 'fs/promises';
import config from 'src/config';

@Injectable()
export class FileService {
  async writeMedia(path: string, data: BinaryLike) {
    const fullPath = join(config.mediaRoot, path);
    const directories = fullPath.split(sep);

    for (let i = 1; i < directories.length - 1; i++) {
      const tempPath = directories.slice(0, i + 1).join(sep);
      await access(tempPath).catch(async () => await mkdir(tempPath));
    }

    await writeFile(fullPath, data);
  }

  async createMediaPath(path: string) {
    const fullPath = join(config.mediaRoot, path);
    const directories = fullPath.split(sep);

    for (let i = 1; i < directories.length - 1; i++) {
      const tempPath = directories.slice(0, i + 1).join(sep);
      await access(tempPath).catch(async () => await mkdir(tempPath));
    }
  }

  async deleteMediaFolder(path: string) {
    const fullPath = join(config.mediaRoot, path);

    try {
      await access(fullPath);
      await rm(fullPath, { recursive: true });
    } catch (error) {}
  }
}
