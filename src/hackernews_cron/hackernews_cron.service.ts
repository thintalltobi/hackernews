import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import {
  CommentDto,
  EntityDto,
  EntityType,
  StoryDto,
  UserDto,
} from './dto/create-hackernews_cron.dto';
import { Stories } from '../story/entities/story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom, map } from 'rxjs';
import { Users } from 'src/user/entities/user.entity';
import { CreateStoryDto } from 'src/story/dto/create-story.dto';
import { Comments } from 'src/comment/entities/comment.entity';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
CacheModule.register({ isGlobal: true });

@Injectable()
export class HackernewsCronService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly httpService: HttpService,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Stories)
    private readonly storyRepository: Repository<Stories>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // async findAll(): Promise<number> {
  //   return await this.saveAndGetAuthorIdByName('jl');
  // }

  async fetchStories() {
    //get the id of the maximum entity which would be the
    const maxEntityId = await this.getMaxEntityId(); //100
    let lastMaxEntityId = maxEntityId;
    console.log(lastMaxEntityId);

    let numberOfStoriesRan = 0;

    while (numberOfStoriesRan <= 99) {
      const entityId = lastMaxEntityId - 1;

      // fetch entity by id
      const eachEntity = await this.getEntityById(entityId);

      // only save when the entity type is story
      if (eachEntity.type == EntityType.story) {

        // save the story data
        let savedStory = await this.saveStoryEntity(eachEntity);

        // save all the comments and comments authors
        await this.fetchData(eachEntity,[], eachEntity.id);

        numberOfStoriesRan++;
        lastMaxEntityId = savedStory.external_id;
      }
      lastMaxEntityId = entityId;
      console.log(numberOfStoriesRan, entityId, lastMaxEntityId);
    }
  }

  async checkIfParentIsAStory(comment_id: number){
    // fetch the comments entity
    const comment = await this.getEntityById(comment_id);

    if(!comment){
      return false
    }
    // fetch the entity parent and check if the type is a story
    const entity = await this.getEntityById(comment.parent);

    if(entity.type == EntityType.story){
      return true
    }

  }

  async fetchData(entity: EntityDto, comment_ids: number[], story_id: number) {
    let newCommentIds = comment_ids

    if (entity.kids && entity.kids.length > 0) {
      entity.kids.forEach(async (kidId) => {
        const kidEntity = await this.getEntityById(kidId);
        let deleted = kidEntity.deleted ? new Date() : null;

        let createCommentData: CommentDto = {
          external_id: kidEntity.id,
          text: kidEntity.text,
          score: kidEntity.score,
          dead: kidEntity.dead,
          deleted_at: deleted,
          created_at: new Date(),
          parent_comment_id: await this.checkIfParentIsAStory(kidEntity.id) ? null :  kidEntity.parent,
          entity_id: story_id, 
          created_by_id: await this.saveAndGetAuthorIdByName(kidEntity.by),
        };

        const commentData =
          await this.commentRepository.save(createCommentData);
          comment_ids.push(commentData.external_id)
        this.fetchData(kidEntity,newCommentIds,story_id);
      });
    }
    return comment_ids;
  }
  
  async saveAndGetAuthorIdByName(name: string) {
    const checkIfAuthorExists = await this.userRepository.findOneBy({ name });

    if (checkIfAuthorExists) {
      return checkIfAuthorExists.id;
    }

    const { data } = await firstValueFrom(
      this.httpService
        .get<UserDto>(
          `https://hacker-news.firebaseio.com/v0/user/${name}.json?print=pretty`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            //this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    if (data == undefined || data == null) {
      // throw error, author not found
    }

    const savedAuthor = await this.userRepository.save({
      about: data.about,
      karma: data.karma,
      created_at: new Date(),
      name: data.id,
    });

    return savedAuthor.id;
  }

  async saveStoryEntity(eachEntity: EntityDto): Promise<any> {
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    let createStoryData = {
      external_id: eachEntity.id,
      title: eachEntity.title,
      text: eachEntity.text,
      score: eachEntity.score,
      dead: eachEntity.dead,
      deleted_at: eachEntity.deleted ? new Date() : null,
      created_at: new Date(),
      descendant_count: eachEntity.descendants,
      kids: eachEntity.kids,
      createdById: await this.saveAndGetAuthorIdByName(eachEntity.by),
    };
    const storyData = await this.storyRepository.save(createStoryData);

    try {
      // await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      // await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      //  await queryRunner.release();
    }

    console.log('saved a story');

    return storyData;
  }

  async getMaxEntityId(): Promise<number> {
    const maxEntityValue =
      await this.cacheManager.get<string>('lastEntityValue');

    if (!maxEntityValue) {
      const { data } = await firstValueFrom(
        this.httpService
          .get<number>(
            'https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty',
          )
          .pipe(
            catchError((error: AxiosError) => {
              //this.logger.error(error.response.data);
              throw 'An error happened!';
            }),
          ),
      );

      await this.cacheManager.set('lastEntityValue', data.toString());
    }

    return Number(maxEntityValue);
  }
  async getEntityById(entity_id: number): Promise<EntityDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<EntityDto>(
          `https://hacker-news.firebaseio.com/v0/item/${entity_id}.json?print=pretty`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            //this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );

    return data;
  }
}
