import { DataSource } from 'typeorm';
import config from '../config';
import { User } from 'src/user/entities/user.entity';
import { join } from 'path';
import { Point } from 'src/point/entities/point.entity';
import { DurationStat } from 'src/duration-stat/entities/duration-stat.entity';
import { Location } from 'src/location/entities/location.entity';
import { VisitStat } from 'src/duration-stat/entities/visit-stat.entity';
import { Payment } from 'src/payment/entities/payment.entity';

const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  ...config.db,
  entities: [User, Location, Point, VisitStat, DurationStat, Payment],
  migrations: [join(__dirname, '..', '..', 'migrations', '*.js')],
  synchronize: false,
  logging: false,
});

export default dataSource;
