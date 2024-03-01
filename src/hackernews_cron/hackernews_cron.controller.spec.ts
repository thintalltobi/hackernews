import { Test, TestingModule } from '@nestjs/testing';
import { HackernewsCronController } from './hackernews_cron.controller';
import { HackernewsCronService } from './hackernews_cron.service';

describe('HackernewsCronController', () => {
  let controller: HackernewsCronController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HackernewsCronController],
      providers: [HackernewsCronService],
    }).compile();

    controller = module.get<HackernewsCronController>(HackernewsCronController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
