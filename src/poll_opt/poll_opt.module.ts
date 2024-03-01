import { Module } from '@nestjs/common';
import { PollOptService } from './poll_opt.service';
import { PollOptController } from './poll_opt.controller';
import { PollOpt } from './entities/poll_opt.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PollOpt]),
  ],
  exports: [PollOptService],
  controllers: [PollOptController],
  providers: [PollOptService],
})
export class PollOptModule {}
