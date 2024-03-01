import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import {
  EntityDto
} from './dto/create-hackernews_cron.dto';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { HackernewsCronService } from './hackernews_cron.service';

@Processor('hackerNewsQueue')
export class HackernewsConsumer {

  constructor(
    private readonly hackernewsCronService: HackernewsCronService,
  ) {}

  @Process()
  async performJob(
    job: Job,
  ): Promise<Observable<AxiosResponse<EntityDto[], any>>> {
    await this.hackernewsCronService.fetchStories()
    return;
  }

}
