import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

export class CreateExamDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Description' })
  description: string;

  @IsMongoId()
  @ApiProperty({ type: String, description: 'Course id' })
  course: string;

  @IsMongoId()
  @ApiProperty({ type: String, description: 'Teacher id' })
  teacher: string;

  @IsEnum(CEFRLevel)
  @ApiProperty({ enum: CEFRLevel, description: 'Level (A1/A2 ...)' })
  level: CEFRLevel;

  @IsEnum(ExerciseTag, { each: true })
  @ApiProperty({ description: 'Tags', type: [String], enum: ExerciseTag })
  tags: ExerciseTag[];

  @IsMongoId({ each: true })
  @ApiProperty({ type: [String], description: 'Exercises ids' })
  parts: string[];
}
