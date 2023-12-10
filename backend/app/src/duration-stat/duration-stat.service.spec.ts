import { Test, TestingModule } from '@nestjs/testing';
import { DurationStatService } from './duration-stat.service';

describe('DurationStatService', () => {
  let service: DurationStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DurationStatService],
    }).compile();

    service = module.get<DurationStatService>(DurationStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
