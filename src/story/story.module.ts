import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { Stories } from '../story/entities/story.entity'
import { StoryController } from './story.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Stories]),
  ],
  exports: [StoryService],
  controllers: [StoryController],
  providers: [StoryService],
})
export class StoryModule {}
