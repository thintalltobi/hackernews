import { HttpException, Injectable } from '@nestjs/common';
import { CreatePollOptDto } from './dto/create-poll_opt.dto';
import { UpdatePollOptDto } from './dto/update-poll_opt.dto';
import { PollOpt } from '../poll_opt/entities/poll_opt.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PollOptService {

  constructor(
    @InjectRepository(PollOpt)
    private readonly pollOptRepository: Repository<PollOpt>,
  ) {}

  async create(
    createPollOptDto: CreatePollOptDto,
  ) {
    console.log(createPollOptDto);

    const pollOptData =
      await this.pollOptRepository.create(
        createPollOptDto,
      );
    console.log(pollOptData);
    
      
    return this.pollOptRepository.save(pollOptData);

  }

  async findAll(): Promise<PollOpt[]> {
    return await this.pollOptRepository.find();
  }

  async findOne(id: number): Promise<PollOpt> {
    const pollOptData =
      await this.pollOptRepository.findOneBy({ id });

    if (!pollOptData) {
      throw new HttpException(
        'PollOpt Not Found',
        404,
      );
    }
    return pollOptData;
  }

  async update(
    id: number,
    updatePollOptDto: UpdatePollOptDto,
  ): Promise<PollOpt> {
    const existingPollOpt = await this.findOne(id);
    const pollOptData = this.pollOptRepository.merge(
      existingPollOpt,
      updatePollOptDto,
    );
    return await this.pollOptRepository.save(
      pollOptData,
    );
  }

  async remove(id: number): Promise<PollOpt> {
    const existingPollOpt = await this.findOne(id);
    return await this.pollOptRepository.remove(
      existingPollOpt,
    );
  }
}
