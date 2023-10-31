import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ExerciseType } from 'src/common/enums';

class QuestionResultDto {
  @Transform(value => value.obj.question.toString())
  @ApiProperty({ description: 'Question id' })
  question: string;

  @ApiProperty({ description: 'Is correct answer' })
  isCorrect?: boolean;

  @ApiProperty({ description: 'Answer submitted' })
  answer: object;

  @ApiProperty({ description: 'Correct answer' })
  correctAnswer: object;

  @ApiProperty({ description: 'Result' })
  explanation: string;

  @ApiPropertyOptional({ description: 'Question grade' })
  grade?: number;
}

export class SubmissionDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Submission id' })
  id?: string;

  @Transform(value => value.obj.user.toString())
  @ApiProperty({ description: 'User id' })
  user: string;

  @Transform(value => value.obj.teacher.toString())
  @ApiProperty({ description: 'Teacher id' })
  teacher: string;

  @ApiProperty({ description: 'Course id' })
  course?: string;

  @ApiPropertyOptional({ description: 'Exercise grade' })
  grade?: number;

  @Exclude()
  @ApiPropertyOptional({ description: 'Exercise need grade' })
  needGrade?: boolean;

  @Transform(value => value.obj.exercise.toString())
  @ApiProperty({ description: 'Exercise id' })
  exercise: string;

  @ApiProperty({ description: 'Exercise type' })
  exerciseType: ExerciseType;

  @ApiProperty({ description: 'Total question' })
  totalQuestion?: number;

  @ApiProperty({ description: 'Total correct question' })
  totalCorrect?: number;

  @ApiProperty({ description: 'Total question done' })
  totalDone?: number;

  @ApiProperty({ description: 'Exercise progress' })
  progress?: number;

  @Type(() => QuestionResultDto)
  @ApiProperty({ type: QuestionResultDto, description: 'Result' })
  detail: QuestionResultDto[];
}
