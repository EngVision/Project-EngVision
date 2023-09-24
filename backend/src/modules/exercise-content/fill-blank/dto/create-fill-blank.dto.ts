import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExerciseQuestionDto } from '../../dto/exercise-content.dto';

class QuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Question text' })
  text: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Image file id',
  })
  image?: string;
}

export class CreateFillBlankDto extends ExerciseQuestionDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => QuestionDto)
  @ApiProperty({ type: QuestionDto, description: 'Question content' })
  question: QuestionDto;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Correct answer' })
  correctAnswer: string;
}
