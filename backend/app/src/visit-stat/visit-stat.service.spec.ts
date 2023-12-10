import { Test, TestingModule } from '@nestjs/testing';
import { VisitStatService } from './visit-stat.service';

describe('VisitStatService', () => {
  let service: VisitStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitStatService],
    }).compile();

    service = module.get<VisitStatService>(VisitStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
