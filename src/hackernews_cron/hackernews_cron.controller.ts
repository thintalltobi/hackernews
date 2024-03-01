import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HackernewsCronService } from './hackernews_cron.service';
import { UpdateHackernewsCronDto } from './dto/update-hackernews_cron.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('hackerNewsQueue')
export class HackernewsCronController {
  constructor(
    @InjectQueue('hackerNewsQueue') private readonly entityQueue: Queue,
    private readonly hackernewsCronService: HackernewsCronService,
  ) {}

  // @Get()
  // findAll() {
  //   return this.hackernewsCronService.findAll();
  // }
  
  async initJob() {
    await this.entityQueue.add({}, { repeat: { cron: '5 * * * * *' } });
    console.log('hii2');
  }
  onModuleInit(){
    this.initJob().then(console.log).catch(console.log);
  }


}
