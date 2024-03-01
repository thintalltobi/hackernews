import { Test, TestingModule } from '@nestjs/testing';
import { PollOptService } from './poll_opt.service';

describe('PollOptService', () => {
  let service: PollOptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PollOptService],
    }).compile();

    service = module.get<PollOptService>(PollOptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
