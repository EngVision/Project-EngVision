import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExerciseQuestionDto } from '../../dto/exercise-content.dto';

enum typeItem {
  Image = 'Image',
  Text = 'Text',
}

export class Item {
  @IsNotEmpty()
  @IsEnum(typeItem)
  @ApiPropertyOptional({ type: typeItem, description: 'Type' })
  type: typeItem;

  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Content' })
  content: string;
}

class QuestionDto {
  @IsNotEmpty()
  @IsArray({ each: true })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @ArrayMaxSize(2, { each: true })
  @Type(() => Item)
  @ApiProperty({ type: [[Item, Item]], description: 'Pairs' })
  pairs: Item[][];

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

export class CreateMatchDto extends ExerciseQuestionDto {
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
