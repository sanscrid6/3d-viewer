import { ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Catch } from '@nestjs/common/decorators/core/catch.decorator';
import { Response } from 'express';

export class CustomException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('CustomExceptionFilter');

  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const msg = exception.message;
    this.logger.error(msg);

    response.status(400).json({
      statusCode: 400,
      error: msg,
    });
  }
}
