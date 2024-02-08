import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CEFRLevel, ExerciseTag, ExerciseType } from 'src/common/enums';

class ImportLessonContentDto {
  @IsArray()
  @IsEnum(ExerciseTag, { each: true })
  tags: ExerciseTag[];

  @IsEnum(CEFRLevel)
  level: CEFRLevel;

  @IsOptional()
  question: any;

  @IsOptional()
  correctAnswer: any;
}

class ImportLessonContentQuestionDto {
  @IsString()
  text: string;

  @IsOptional()
  @IsMongoId()
  image?: string;

  @IsOptional()
  @IsMongoId()
  audio?: string;
}

class ImportLessonExerciseDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  deadline: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsArray()
  @IsEnum(ExerciseTag, { each: true })
  tags: ExerciseTag[];

  @IsEnum(CEFRLevel)
  level: CEFRLevel;

  @IsEnum(ExerciseType)
  type: ExerciseType;

  @IsBoolean()
  needGrade: boolean;

  @Type(() => ImportLessonContentQuestionDto)
  contentQuestion: ImportLessonContentQuestionDto;

  @IsArray()
  @IsString({ each: true })
  content: string[];
}

export class ImportLessonDto {
  @IsString()
  title: string;

  @IsArray()
  @Type(() => ImportLessonExerciseDto)
  exercises: ImportLessonExerciseDto[];
}
