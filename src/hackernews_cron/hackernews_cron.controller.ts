import {
  Controller
} from '@nestjs/common';
import { HackernewsCronService } from './hackernews_cron.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('hackerNewsQueue')
export class HackernewsCronController {
  constructor(
    @InjectQueue('hackerNewsQueue') private readonly entityQueue: Queue,
    private readonly hackernewsCronService: HackernewsCronService,
  ) {}
  
  async initJob() {
    await this.entityQueue.add({}, { repeat: { cron: '0 */12 * * * ' } });
    console.log('hii from queue');
  }
  onModuleInit(){
    this.initJob().then(console.log).catch(console.log);
  }


}
