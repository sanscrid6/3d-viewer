import { Test, TestingModule } from '@nestjs/testing';
import { VisitStatController } from './visit-stat.controller';
import { VisitStatService } from './visit-stat.service';

describe('VisitStatController', () => {
  let controller: VisitStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitStatController],
      providers: [VisitStatService],
    }).compile();

    controller = module.get<VisitStatController>(VisitStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
