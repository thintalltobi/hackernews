import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comments } from '../comment/entities/comment.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comments)
    private readonly commentRepository: Repository<Comments>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
  ) {

      
    return 'comments created';

  }

  async findAll(): Promise<Comments[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comments> {
    const commentData =
      await this.commentRepository.findOneBy({ id });

    if (!commentData) {
      throw new HttpException(
        'Comment Not Found',
        404,
      );
    }
    return commentData;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<boolean> {
   return true
  }

  async remove(id: number): Promise<Comments> {
    const existingComment = await this.findOne(id);
    const userData = this.commentRepository.merge(
      existingComment,
      { deleted_at: new Date()}
    );
    return await this.commentRepository.save(
      userData,
    );
  }
}
