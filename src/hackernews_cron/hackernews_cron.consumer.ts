import { HttpException, Injectable, Logger, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { DataSource, Repository } from 'typeorm';
import { Stories } from 'src/story/entities/story.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  CommentDto,
  EntityDto,
  EntityType,
  StoryDto,
} from './dto/create-hackernews_cron.dto';
import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Comments } from 'src/comment/entities/comment.entity';
import { Users } from 'src/user/entities/user.entity';
import { HackernewsCronService } from './hackernews_cron.service';

@Processor('hackerNewsQueue')
export class HackernewsConsumer {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Stories)
     private readonly storyRepository: Repository<Stories>,
    private readonly httpService: HttpService,
    private readonly hackernewsCronService: HackernewsCronService
  ) {}

  @Process()
  async performJob(
    job: Job,
  ): Promise<Observable<AxiosResponse<EntityDto[], any>>> {
   // await this.hackernewsCronService.fetchStories()
    //console.log('completed!!', new Date());

    // get the id of the maximum entity which would be the
    // const maxEntityId = await this.getMaxEntityId(); //100
    // let lastMaxEntityId = maxEntityId;

    // let numberOfStoriesRan = 0;

    // while (numberOfStoriesRan <= 100) {
    //   const entityId = lastMaxEntityId-1
    //   const eachEntity = await this.getEntityById(entityId);

    //   // save story,comment, jobs, poll, pollopt

    //   if (eachEntity.type == EntityType.story) {
    //     await this.saveStoryEntity(eachEntity);
    //     numberOfStoriesRan++;
    //     lastMaxEntityId = eachEntity.id;

    //     console.log('saved a story');
    //   }

    //   if (eachEntity.type == EntityType.comment) {
    //     console.log('this is a comment');
    //   }
    // }

    return;
  }

//   async saveStoryEntity(eachEntity: EntityDto): Promise<boolean> {
//     // const queryRunner = this.dataSource.createQueryRunner();
//     // await queryRunner.connect();
//     // await queryRunner.startTransaction();

//     let date = new Date(eachEntity.time * 1000);
//     let created_at = new Date(
//       `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`,
//     );
//     let createStoryData = {
//       external_id: eachEntity.id,
//       title: eachEntity.title,
//       text: eachEntity.text,
//       score: eachEntity.score,
//       dead: eachEntity.dead,
//       deleted_at: eachEntity.deleted ? new Date() : null,
//       created_at: created_at,
//       descendant_count: eachEntity.descendants,
//       kids: eachEntity.kids,
//       created_by_id: 2, // get the user id from the user api if its not in the db
//     };

//     try {
//       let date = new Date(eachEntity.time * 1000);
//       let created_at = new Date(
//         `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`,
//       );
//       const storyData = await this.storyRepository.save(createStoryData);
//       eachEntity.kids.forEach(async (comments_id) => {
//         let eachStoryComment = await this.getEntityById(comments_id);

//         let createCommentData: CommentDto = {
//           external_id: eachStoryComment.id,
//           text: eachStoryComment.text,
//           score: eachStoryComment.score,
//           dead: eachStoryComment.dead,
//           deleted_at: eachStoryComment.deleted ? new Date() : null,
//           created_at: created_at,
//           parent: storyData.id,
//           created_by_id: await this.getAuthorIdByName(eachStoryComment.by),
//         };
//         const commentData =
//           await this.commentRepository.save(createCommentData);
//       });

//      // await queryRunner.commitTransaction();
//     } catch (err) {
//       // since we have errors lets rollback the changes we made
//      // await queryRunner.rollbackTransaction();
//     } finally {
//       // you need to release a queryRunner which was manually instantiated
//     //  await queryRunner.release();
//     }

//     console.log('saved a story');

//     return true;
//   }

//   async getMaxEntityId(): Promise<number> {
//     const { data } = await firstValueFrom(
//       this.httpService
//         .get<number>(
//           'https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty',
//         )
//         .pipe(
//           catchError((error: AxiosError) => {
//             //this.logger.error(error.response.data);
//             throw 'An error happened!';
//           }),
//         ),
//     );

//     return data;
//   }
//   async getEntityById(entity_id: number): Promise<EntityDto> {
//     const data: any = this.httpService
//       .get<any>(
//         `https://hacker-news.firebaseio.com/v0/item/${entity_id}.json?print=pretty`,
//       )
//       .pipe(
//         map((axiosResponse: AxiosResponse) => {
//           return axiosResponse.data;
//         }),
//         catchError((error: AxiosError) => {
//           //this.logger.error(error.response.data);
//           throw 'An error happened!';
//         }),
//       );

//     return data.forEach(async (eachEntity) => eachEntity);
//   }
//   async getAuthorIdByName(name: string) {
//     const user: any = this.httpService
//       .get<any>(
//         `https://hacker-news.firebaseio.com/v0/user/${name}.json?print=pretty`,
//       )
//       .pipe(
//         map((axiosResponse: AxiosResponse) => {
//           return axiosResponse.data;
//         }),
//         catchError((error: AxiosError) => {
//           //this.logger.error(error.response.data);
//           throw 'An error happened!';
//         }),
//       );

//     const userData = user.forEach(async (eachEntity) => eachEntity);
//     let date = new Date(userData.time * 1000);
//     let created_at = new Date(
//       `${date.toLocaleDateString('default')} ${date.toLocaleTimeString('default')}`,
//     );

//     if (userData == undefined || userData == null) {
//       // throw error, author not found
//     }

//     this.userRepository.save({
//       about: userData.about,
//       karma: userData.karma,
//       created_at: created_at,
//       name: userData.id,
//     });

//     return userData.id;
//   }
  // async create(): Promise<Observable<AxiosResponse<EntityDto[], any>>> {
  //   // get the id of the maximum entity which would be the
  //   const maxEntityId = await this.getMaxEntityId();

  //   for (
  //     let entity_id = Number(maxEntityId) - 2;
  //     entity_id <= Number(maxEntityId);
  //     entity_id++
  //   ) {
  //     const entity = await this.getEntityById(entity_id);

  //     let response = entity.forEach(async (eachData) => {
  //       console.log(eachData);
  //       // save story,comment, jobs, poll, pollopt
  //       await this.saveStoryEntity(eachData);

  //       if (eachData.type == EntityType.story) {
  //         console.log('this is a story');
  //       }
  //       if (eachData.type == EntityType.job) {
  //         console.log('this is a job');
  //       }
  //       if (eachData.type == EntityType.comment) {
  //         console.log('this is a comment');
  //       }
  //       if (eachData.type == EntityType.poll) {
  //         console.log('this is a poll');
  //       }
  //       if (eachData.type == EntityType.pollopt) {
  //         console.log('this is a pollopt');
  //       }
  //     });
  //   }

  //   return;
  // }

  // private readonly logger = new Logger(StoryService.name);

  // @Cron('5 * * * * *')
  // async handleCron(): Promise<Observable<AxiosResponse<Stories[], any>>> {
  //   const { data } = await firstValueFrom(
  //     this.httpService
  //       .get<number>(
  //         'https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty',
  //       )
  //       .pipe(
  //         catchError((error: AxiosError) => {
  //           this.logger.error(error.response.data);
  //           throw 'An error happened!';
  //         }),
  //       ),
  //   );
  //   console.log(data);
  //   const allEntities = [];
  //   for (let i = Number(data) - 2; i <= Number(data); i++) {
  //     const data = this.httpService
  //       .get<any>(
  //         `https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`,
  //       )
  //       .pipe(
  //         map((axiosResponse: AxiosResponse) => {
  //           return axiosResponse.data;
  //         }),
  //         catchError((error: AxiosError) => {
  //           this.logger.error(error.response.data);
  //           throw 'An error happened!';
  //         }),
  //       );

  //     let response = data.forEach((eachData) => {
  //       console.log(eachData.data);
  //       allEntities.push(eachData.data);
  //     });
  //   }
  //   console.log(allEntities);

  //   return;
  // }
}
