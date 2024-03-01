import { PartialType } from '@nestjs/swagger';
import { CreateHackernewsCronDto } from './create-hackernews_cron.dto';

export class UpdateHackernewsCronDto extends PartialType(CreateHackernewsCronDto) {}
