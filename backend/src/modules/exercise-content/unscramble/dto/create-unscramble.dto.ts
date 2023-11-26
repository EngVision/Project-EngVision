import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
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

class QuestionDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty({ type: [String], description: 'Question text' })
  items: string[];

  @IsNotEmpty()
  @IsBoolean()
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Unscramble by word or characters',
  })
  isUnscrambleByText: boolean;

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

export class CreateUnscrambleDto extends ExerciseQuestionDto {
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
