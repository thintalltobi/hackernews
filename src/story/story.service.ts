import { HttpException, Injectable, Logger } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Stories } from '../story/entities/story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StoryService {
  constructor(
    @InjectRepository(Stories)
    private readonly storyRepository: Repository<Stories>,
  ) {}

  async create(createStoryDto: CreateStoryDto) {
    return 'story created';
  }

  async findAll(): Promise<Stories[]> {
    return await this.storyRepository.find();
  }

  async findOne(id: number): Promise<Stories> {
    const storyData = await this.storyRepository.findOneBy({ id });

    if (!storyData) {
      throw new HttpException('Story Not Found', 404);
    }
    return storyData;
  }

  async update(id: number, updateStoryDto: UpdateStoryDto): Promise<boolean> {
    return true;
  }

  async remove(id: number): Promise<Stories> {
    const existingStory = await this.findOne(id);

    const storyData = this.storyRepository.merge(
      existingStory,
      { deleted_at: new Date()}
    );
    return await this.storyRepository.save(
      storyData,
    );
  }
}
