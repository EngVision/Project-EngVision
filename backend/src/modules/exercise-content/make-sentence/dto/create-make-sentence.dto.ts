import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
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
  @ApiPropertyOptional({
    type: String,
    description: 'Audio file id',
  })
  audio?: string;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({
    type: String,
    description: 'Image file id',
  })
  image?: string;
}

class CorrectAnswerDto {
  @IsEmpty()
  detail: null;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Explain' })
  explanation: string;
}

export class CreateMakeSentenceDto extends ExerciseQuestionDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => QuestionDto)
  @ApiProperty({ type: QuestionDto, description: 'Question content' })
  question: QuestionDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CorrectAnswerDto)
  @ApiProperty({ type: CorrectAnswerDto, description: 'Correct answer' })
  correctAnswer: CorrectAnswerDto;
}
