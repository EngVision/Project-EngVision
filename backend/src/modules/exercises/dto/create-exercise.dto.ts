import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CEFRLevel, ExerciseTag, ExerciseType } from 'src/common/enums';
import { ExerciseContentDto } from 'src/modules/exercise-content/dto/exercise-content.dto';

export class CreateExerciseDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Title' })
  title?: string;

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

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ExerciseContentDto)
  @ApiProperty({ type: ExerciseContentDto, description: 'Exercise content' })
  content: ExerciseContentDto;
}
