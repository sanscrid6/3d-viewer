import { config } from 'dotenv';

config();

type Environment = 'production' | 'dev';

export default {
  port: process.env.PORT ?? 8888,
  db: {
    database: process.env.DB_NAME ?? 'db',
    host: process.env.DB_HOST ?? 'localhost',
    username: process.env.DB_USERNAME ?? 'aboba',
    password: process.env.DB_PASS ?? 'aboba',
  },
  environment: (process.env.NODE_ENV ?? 'dev') as Environment,
  redis: process.env.REDIS_URL ?? '',
  mediaRoot: process.env.MEDIA_ROOT,
  jwtSecret: process.env.JWT_SECRET ?? 'aboba',
  secret: process.env.SECRET ?? 'aboba',
  maxUsesPerDay: +(process.env.MAX_USES ?? '3'),
  apiKeys: JSON.parse(process.env.API_KEYS ?? '[]'),
  mediaPrefix: process.env.MEDIA_PREFIX || `media`,
};
