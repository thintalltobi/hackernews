import { Module } from '@nestjs/common';
import { HackernewsCronService } from './hackernews_cron.service';
import { HackernewsCronController } from './hackernews_cron.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stories } from 'src/story/entities/story.entity';
import { BullModule } from '@nestjs/bull';
import { Authors } from 'src/author/entities/author.entity';
import { Comments } from 'src/comment/entities/comment.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { HackernewsConsumer } from './hackernews_cron.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'hackerNewsQueue',
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    HttpModule,
    TypeOrmModule.forFeature([Stories, Comments, Authors]),
  ],
  exports: [HackernewsCronService],
  controllers: [HackernewsCronController],
  providers: [HackernewsCronService, HackernewsConsumer],
})
export class HackernewsCronModule {}
