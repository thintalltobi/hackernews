import { Inject, Injectable } from '@nestjs/common';
import {
  CommentDto,
  EntityDto,
  EntityType,
  UserDto,
} from './dto/create-hackernews_cron.dto';
import { Stories } from '../story/entities/story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { Authors } from 'src/author/entities/author.entity';
import { Comments } from 'src/comment/entities/comment.entity';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
CacheModule.register({ isGlobal: true });

@Injectable()
export class HackernewsCronService {
  constructor(
    @InjectRepository(Authors)
    private readonly userRepository: Repository<Authors>,
    private readonly httpService: HttpService,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Stories)
    private readonly storyRepository: Repository<Stories>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private dataSource: DataSource,
  ) {}

  async fetchStories() {
    //get the id of the maximum entity which would be the
    const currentMaxEntityId = await this.getMaxEntityId(); //100
    let lastMaxEntityId = currentMaxEntityId;
    let numberOfStoriesRan = 0;

    // keep running until the no of stories reaches 100
    while (numberOfStoriesRan <= 99) {
      const entityId = lastMaxEntityId - 1;

      // fetch entity by id
      const eachEntity = await this.getEntityById(entityId);

      // only save when the entity type is story
      if (eachEntity.type == EntityType.story) {
        // save the story data
        await this.saveStoryAndItsEntities(eachEntity);

        numberOfStoriesRan++;
        lastMaxEntityId = eachEntity.id;
      }
      lastMaxEntityId = entityId;
    }
    await this.cacheManager.set('lastEntityValue', lastMaxEntityId.toString());
  }

  async saveComments(
    commentIds: number[],
    storyId: number,
    isFirstLevelComment = false,
  ) {
    if (commentIds && commentIds.length > 0) {
      commentIds.forEach(async (commentId) => {
        const commentEntity = await this.getEntityById(commentId);
        let deleted = commentEntity.deleted ? new Date() : null;

        let createCommentData: CommentDto = {
          external_id: commentEntity.id,
          text: commentEntity.text,
          score: commentEntity.score,
          dead: commentEntity.dead,
          deleted_at: deleted,
          created_at: new Date(),
          parent_comment_id: isFirstLevelComment ? null : commentEntity.parent,
          entityId: storyId,
          createdById: await this.saveAndGetAuthorIdByName(commentEntity.by),
        };

        await this.commentRepository.save(createCommentData);
        await this.saveComments(commentEntity.kids, storyId);
      });
    }

    return;
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

  async saveStoryAndItsEntities(eachEntity: EntityDto): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let createStoryData = {
        external_id: eachEntity.id,
        title: eachEntity.title,
        text: eachEntity.text,
        score: eachEntity.score,
        dead: eachEntity.dead,
        deleted_at: eachEntity.deleted ? new Date() : null,
        created_at: new Date(),
        descendant_count: eachEntity.descendants,
        createdById: await this.saveAndGetAuthorIdByName(eachEntity.by),
      };
      console.log(eachEntity, createStoryData);

      let savedStory = await this.storyRepository.save(createStoryData);
      await this.saveComments(eachEntity.kids, savedStory.id, true);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return true;
  }

  async getMaxEntityId(): Promise<number> {
    const maxEntityValue =
      await this.cacheManager.get<string>('lastEntityValue');

    if (maxEntityValue) {
      return Number(maxEntityValue);
    }
    const { data } = await firstValueFrom(
      this.httpService
        .get<number>(
          'https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty',
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw 'Unable to fetch Max Entity!';
          }),
        ),
    );
    await this.cacheManager.set('lastEntityValue', data.toString());
    return data;
  }

  async getEntityById(entity_id: number): Promise<EntityDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<EntityDto>(
          `https://hacker-news.firebaseio.com/v0/item/${entity_id}.json?print=pretty`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw 'Unable to fetch Entity Data, kindly reach out to the administratiors';
          }),
        ),
    );

    return data;
  }
}
