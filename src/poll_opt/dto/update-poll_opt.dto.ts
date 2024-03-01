import { PartialType } from '@nestjs/mapped-types';
import { CreatePollOptDto } from './create-poll_opt.dto';

export class UpdatePollOptDto extends PartialType(CreatePollOptDto) {}
