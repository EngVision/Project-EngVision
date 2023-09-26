import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmptyObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ExerciseType } from 'src/common/enums';

class QuestionResultDto {
  @IsMongoId()
  question: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsNotEmptyObject()
  correctAnswer: object;

  @IsOptional()
  explain: string;
}

export class AssignmentDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  exercise: string;

  @IsEnum(ExerciseType)
  exerciseType: ExerciseType;

  @IsOptional()
  totalQuestion?: number;

  @IsOptional()
  totalCorrect?: number;

  @IsOptional()
  totalDone?: number;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => QuestionResultDto)
  @ValidateNested({ each: true })
  detail: QuestionResultDto[];
}
