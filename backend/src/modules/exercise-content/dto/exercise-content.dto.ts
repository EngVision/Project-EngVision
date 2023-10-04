import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDefined, IsEnum } from 'class-validator';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

export class ExerciseQuestionDto {
  @IsDefined()
  @ApiProperty({ type: Object, description: 'Question' })
  question: any;

  @ApiProperty({ type: Object, description: 'Correct answer' })
  correctAnswer: {
    detail: any;
    explanation: string;
  };

  @IsArray()
  @IsEnum(ExerciseTag, { each: true })
  @ArrayMinSize(1)
  @ApiProperty({
    enum: ExerciseTag,
    isArray: true,
    description: 'Question tags',
  })
  tags: ExerciseTag[];

  @IsEnum(CEFRLevel)
  @ApiProperty({
    enum: CEFRLevel,
    description: 'Question level',
  })
  level: CEFRLevel;
}
