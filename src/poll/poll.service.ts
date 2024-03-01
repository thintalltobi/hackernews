import { HttpException, Injectable } from '@nestjs/common';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { Poll } from '../poll/entities/poll.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PollService {

  constructor(
    @InjectRepository(Poll)
    private readonly pollRepository: Repository<Poll>,
  ) {}

  async create(
    createPollDto: CreatePollDto,
  ) {
    console.log(createPollDto);

    const pollData =
      await this.pollRepository.create(
        createPollDto,
      );
    console.log(pollData);
    
      
    return this.pollRepository.save(pollData);

  }

  async findAll(): Promise<Poll[]> {
    return await this.pollRepository.find();
  }

  async findOne(id: number): Promise<Poll> {
    const pollData =
      await this.pollRepository.findOneBy({ id });

    if (!pollData) {
      throw new HttpException(
        'Poll Not Found',
        404,
      );
    }
    return pollData;
  }

  async update(
    id: number,
    updatePollDto: UpdatePollDto,
  ): Promise<Poll> {
    const existingPoll = await this.findOne(id);
    const pollData = this.pollRepository.merge(
      existingPoll,
      updatePollDto,
    );
    return await this.pollRepository.save(
      pollData,
    );
  }

  async remove(id: number): Promise<Poll> {
    const existingPoll = await this.findOne(id);
    return await this.pollRepository.remove(
      existingPoll,
    );
  }
}
