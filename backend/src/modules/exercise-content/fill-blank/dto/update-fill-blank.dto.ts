import { PartialType } from '@nestjs/swagger';
import { CreateFillBlankDto } from './create-fill-blank.dto';

export class UpdateFillBlankDto extends PartialType(CreateFillBlankDto) {}
