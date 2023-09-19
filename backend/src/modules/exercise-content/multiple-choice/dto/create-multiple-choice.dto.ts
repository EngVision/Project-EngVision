import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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
import { ExerciseContentDto } from '../../dto/exercise-content.dto';

class AnswerDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Answer Id' })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Answer text' })
  text: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Audio file id',
  })
  audio?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Image file id',
  })
  image?: Types.ObjectId;
}

class QuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Question text' })
  text: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Audio file id',
  })
  audio?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
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

type CorrectAnswerDto = number[];

export class CreateMultipleChoiceDto implements ExerciseContentDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => QuestionDto)
  @ApiProperty({ type: QuestionDto, description: 'Question content' })
  question: QuestionDto;

  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], description: 'Correct answer' })
  correctAnswer: CorrectAnswerDto;
}
