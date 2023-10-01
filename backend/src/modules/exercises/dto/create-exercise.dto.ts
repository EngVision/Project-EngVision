import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CEFRLevel, ExerciseTag, ExerciseType } from 'src/common/enums';
import { ExerciseQuestionDto } from 'src/modules/exercise-content/dto/exercise-content.dto';

export class CreateExerciseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Title' })
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Title' })
  description?: string;

  @IsArray()
  @IsEnum(ExerciseTag, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    enum: ExerciseTag,
    isArray: true,
    description: 'Exercise tags',
  })
  tags: ExerciseTag[];

  @IsEnum(CEFRLevel)
  @ApiProperty({
    enum: CEFRLevel,
    description: 'Exercise level',
  })
  level: CEFRLevel;

  @IsEnum(ExerciseType)
  @ApiProperty({ enum: ExerciseType, description: 'Exercise type' })
  type: ExerciseType;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ExerciseQuestionDto)
  @ApiProperty({ type: [ExerciseQuestionDto], description: 'Exercise content' })
  content: ExerciseQuestionDto[];

  @IsOptional()
  @IsMongoId()
  creator: string;
}
