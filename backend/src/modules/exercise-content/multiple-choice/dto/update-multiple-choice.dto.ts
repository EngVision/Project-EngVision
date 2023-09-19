import { PartialType } from '@nestjs/swagger';
import { CreateMultipleChoiceDto } from './create-multiple-choice.dto';

export class UpdateMultipleChoiceDto extends PartialType(CreateMultipleChoiceDto) {}
