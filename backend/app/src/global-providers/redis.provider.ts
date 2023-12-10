import { ProviderType } from 'src/constants';
import { Redis } from 'ioredis';
import config from 'src/config';

export const RedisProvider = {
  provide: ProviderType.Redis,
  useFactory: () => new Redis(config.redis),
};
