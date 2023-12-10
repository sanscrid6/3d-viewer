import { Test, TestingModule } from '@nestjs/testing';
import { DurationStatController } from './duration-stat.controller';
import { DurationStatService } from './duration-stat.service';

describe('DurationStatController', () => {
  let controller: DurationStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DurationStatController],
      providers: [DurationStatService],
    }).compile();

    controller = module.get<DurationStatController>(DurationStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
