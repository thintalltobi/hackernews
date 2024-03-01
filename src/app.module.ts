import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoryModule } from './story/story.module';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { Users } from './user/entities/user.entity'
import { Comments } from './comment/entities/comment.entity'
import { Stories } from './story/entities/story.entity'
import { ScheduleModule } from '@nestjs/schedule';
import { HackernewsCronModule } from './hackernews_cron/hackernews_cron.module';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { dataSourceOptions } from "./db/ormconfig";

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      password: '',
      username: 'root',
      database: 'hacker-news',
      entities: [Users,Comments,Stories],
      migrations: [
        "src/db/migrations/*.ts"
      ],
      synchronize: false,
      logging: true,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    HttpModule,
    TypeOrmModule.forFeature([Stories]),
    StoryModule,
    CommentModule,
    UserModule,
    HackernewsCronModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
