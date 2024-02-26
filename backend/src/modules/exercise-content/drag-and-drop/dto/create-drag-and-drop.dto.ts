import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
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

export class Item {
  @IsNotEmpty()
  @ApiPropertyOptional({ type: String, description: 'Image' })
  image: string;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Text' })
  text: string;
}

class QuestionDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => Item)
  @ApiProperty({ type: [Item], description: 'Pairs' })
  answers: Item[];

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
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Explain' })
  explanation: string;
}

export class CreateDragAndDropDto extends ExerciseQuestionDto {
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
