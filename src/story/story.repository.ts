
    import { Injectable } from '@nestjs/common';
    import { CreateStoryDto } from './dto/create-story.dto';
    import { UpdateStoryDto } from './dto/update-story.dto';
    import { Stories } from '../story/entities/story.entity'
    import { DataSource } from "typeorm"
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';

    @Injectable()
    export class StoryRepository {
    
    constructor(
        @InjectRepository(Stories)
        private readonly storyRepository: Repository<Stories>,
        ) {}

      async create(createStoryDto: CreateStoryDto) {
        console.log(createStoryDto);
        
        // const userData = await this.storyRepository.create({
        //     ...createStoryDto
        // })
       // await this.storyRepository.save(userData)
       return true
      }
    
      findAll() {
        return `This action returns all story`;
      }
    
      findOne(id: number) {
        return `This action returns a #${id} story`;
      }
    
      update(id: number, updateStoryDto: UpdateStoryDto) {
        return `This action updates a #${id} story`;
      }
    
      remove(id: number) {
        return `This action removes a #${id} story`;
      }
    }
    