import { Test, TestingModule } from '@nestjs/testing';
import { HackernewsCronService } from './hackernews_cron.service';

describe('HackernewsCronService', () => {
  let service: HackernewsCronService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HackernewsCronService],
    }).compile();

    service = module.get<HackernewsCronService>(HackernewsCronService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
