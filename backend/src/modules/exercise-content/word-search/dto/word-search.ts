import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsEmpty,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { ExerciseQuestionDto } from '../../dto/exercise-content.dto';

class QuestionDto {
  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @Length(3, 15, { each: true })
  @ApiProperty({ type: [String], description: 'Words' })
  words: string[];

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description: 'Row',
  })
  row?: number;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({
    type: Number,
    description: 'Col',
  })
  col?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    description: 'Text',
  })
  text?: string;

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
  explanation: string;
}

export class CreateWordSearchDto extends ExerciseQuestionDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => QuestionDto)
  @ApiProperty({ type: QuestionDto, description: 'Question content' })
  question: QuestionDto;

  @IsEmpty()
  correctAnswer: CorrectAnswerDto;
}
