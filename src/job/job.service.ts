import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from '../job/entities/job.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CommentDto, EntityDto, EntityType, UserDto } from 'src/hackernews_cron/dto/create-hackernews_cron.dto';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Stories } from 'src/story/entities/story.entity';
import { Comments } from 'src/comment/entities/comment.entity';
import { HttpService } from '@nestjs/axios';
import { Users } from 'src/user/entities/user.entity';
CacheModule.register({ isGlobal: true });

@Injectable()
export class JobService {

  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly httpService: HttpService,
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
    @InjectRepository(Stories)
    private readonly storyRepository: Repository<Stories>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private dataSource: DataSource
    
  ) {}

  async create(
    createJobDto: CreateJobDto,
  ) {
    console.log(createJobDto);

    const jobData =
      await this.jobRepository.create(
        createJobDto,
      );
    console.log(jobData);
    
      
    return this.jobRepository.save(jobData);

  }

  async fetchStories() {
    //get the id of the maximum entity which would be the
    const maxEntityId = await this.getMaxEntityId(); //100
    let lastMaxEntityId = maxEntityId;
    let numberOfStoriesRan = 0;

    // keep running tntil the no of stories reaches 100
    while (numberOfStoriesRan <= 9) {
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

  async saveComments(entity: EntityDto, comment_ids: number[], story_id: number) {
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
        this.saveComments(kidEntity,newCommentIds,story_id);
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
        created_by_id: await this.saveAndGetAuthorIdByName(eachEntity.by),
      };
      console.log(eachEntity, createStoryData);
      
       await this.storyRepository.save(createStoryData);
       await this.saveComments(eachEntity,[], eachEntity.id);

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

    if (!maxEntityValue) {
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
            throw 'Unable to fetch Entity Data, kindly reach out to the administratiors';
          }),
        ),
    );

    return data;
  }
  
  async findAll(): Promise<Job[]> {
    return await this.jobRepository.find();
  }

  async findOne(id: number): Promise<Job> {
    const jobData =
      await this.jobRepository.findOneBy({ id });

    if (!jobData) {
      throw new HttpException(
        'Job Not Found',
        404,
      );
    }
    return jobData;
  }

  async update(
    id: number,
    updateJobDto: UpdateJobDto,
  ): Promise<Job> {
    const existingJob = await this.findOne(id);
    const jobData = this.jobRepository.merge(
      existingJob,
      updateJobDto,
    );
    return await this.jobRepository.save(
      jobData,
    );
  }

  async remove(id: number): Promise<Job> {
    const existingJob = await this.findOne(id);
    return await this.jobRepository.remove(
      existingJob,
    );
  }
}
