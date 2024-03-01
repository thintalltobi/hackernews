import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Authors } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
  imports: [TypeOrmModule.forFeature([Authors])],
  exports: [AuthorService],
})
export class AuthorModule {}
