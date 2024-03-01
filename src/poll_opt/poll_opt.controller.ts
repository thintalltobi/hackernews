import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PollOptService } from './poll_opt.service';
import { CreatePollOptDto } from './dto/create-poll_opt.dto';
import { UpdatePollOptDto } from './dto/update-poll_opt.dto';

@Controller('poll-opt')
export class PollOptController {
  constructor(private readonly pollOptService: PollOptService) {}

  @Post()
  create(@Body() createPollOptDto: CreatePollOptDto) {
    return this.pollOptService.create(createPollOptDto);
  }

  @Get()
  findAll() {
    return this.pollOptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollOptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePollOptDto: UpdatePollOptDto) {
    return this.pollOptService.update(+id, updatePollOptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pollOptService.remove(+id);
  }
}
