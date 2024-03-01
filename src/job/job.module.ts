import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './entities/job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Stories } from 'src/story/entities/story.entity';
import { Comments } from 'src/comment/entities/comment.entity';
import { Users } from 'src/user/entities/user.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Stories,Comments, Users, Job]),
  ],
  
  exports: [JobService],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
