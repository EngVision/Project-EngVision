import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ExerciseContentDto } from '../../dto/exercise-content.dto';

class QuestionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Question text' })
  text: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({
    type: String,
    description: 'Image file id',
  })
  image?: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean, description: 'Is strict answer' })
  isStrict: boolean;
}

export class CreateFillBlankDto implements ExerciseContentDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => QuestionDto)
  @ApiProperty({ type: QuestionDto, description: 'Question content' })
  question: QuestionDto;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Correct answer' })
  correctAnswer: string;
}
