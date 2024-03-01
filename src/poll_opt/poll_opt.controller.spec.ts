import { Test, TestingModule } from '@nestjs/testing';
import { PollOptController } from './poll_opt.controller';
import { PollOptService } from './poll_opt.service';

describe('PollOptController', () => {
  let controller: PollOptController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollOptController],
      providers: [PollOptService],
    }).compile();

    controller = module.get<PollOptController>(PollOptController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
