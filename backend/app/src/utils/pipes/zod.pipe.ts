import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodObject } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown) {
    try {
      const v = this.schema.parse(value);

      return v;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
