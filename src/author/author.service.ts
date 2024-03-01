import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Authors } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Authors)
    private readonly userRepository: Repository<Authors>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    const userData = await this.userRepository.create(createAuthorDto);

    return this.userRepository.save(userData);
  }

  async findAll(): Promise<Authors[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Authors> {
    const userData = await this.userRepository.findOneBy({ id });

    if (!userData) {
      throw new HttpException('Author Not Found', 404);
    }
    return userData;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Authors> {
    const existingAuthor = await this.findOne(id);
    const userData = this.userRepository.merge(existingAuthor, updateAuthorDto);
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<Authors> {
    const existingAuthor = await this.findOne(id);
    const userData = this.userRepository.merge(existingAuthor, {
      deleted: true,
      deleted_at: new Date(),
    });
    return await this.userRepository.save(userData);
  }
}
