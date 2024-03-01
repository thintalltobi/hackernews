import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../user/entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,

  ) {}

  async create(
    createUserDto: CreateUserDto,
  ) {
    console.log(createUserDto);

    const userData =
      await this.userRepository.create(
        createUserDto,
      );
    console.log(userData);
    
    return this.userRepository.save(userData);

  }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    const userData =
      await this.userRepository.findOneBy({ id });

    if (!userData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(
      existingUser,
      updateUserDto,
    );
    return await this.userRepository.save(
      userData,
    );
  }

  async remove(id: number): Promise<Users> {
    const existingUser = await this.findOne(id);
    const userData = this.userRepository.merge(
      existingUser,
      {deleted: true, deleted_at: new Date()}
    );
    return await this.userRepository.save(
      userData,
    );
  }

}
