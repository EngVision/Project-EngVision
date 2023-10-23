import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Types } from 'mongoose';
import { ExerciseQuestionDto } from '../../dto/exercise-content.dto';

class AnswerDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Answer Id' })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Answer text' })
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
  image?: Types.ObjectId;
}

class QuestionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Question title' })
  title: string;

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

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  @ApiProperty({ type: [AnswerDto], description: 'Title' })
  answers: AnswerDto[];
}

class CorrectAnswerDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], description: 'Correct answer' })
  detail: number[];

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

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CorrectAnswerDto)
  @ApiProperty({ type: CorrectAnswerDto, description: 'Correct answer' })
  correctAnswer: CorrectAnswerDto;
}
