import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule, seconds } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LocationModule } from './location/location.module';
import { PointModule } from './point/point.module';
import { VisitStatModule } from './visit-stat/visit-stat.module';
import { DurationStatModule } from './duration-stat/duration-stat.module';
import { FileService } from './utils/file.service';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    FileService,
  ],
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: seconds(60), limit: 100 }],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      ...config.db,
      entities: [__dirname + '/../**/*.entity.js'],
      migrations: [__dirname.replace('src', 'migrations/*.ts')],
      synchronize: config.environment !== 'production',
      logging: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(config.mediaRoot),
      serveRoot: '/media',
    }),
    LocationModule,
    PointModule,
    VisitStatModule,
    DurationStatModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
