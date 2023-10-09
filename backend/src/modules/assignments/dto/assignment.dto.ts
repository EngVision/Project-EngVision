import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { ExerciseType } from 'src/common/enums';

class QuestionResultDto {
  @ApiProperty({ description: 'Question id' })
  question: string;

  @ApiProperty({ description: 'Is correct answer' })
  isCorrect: boolean;

  @ApiProperty({ description: 'Answer submitted' })
  answer: object;

  @ApiProperty({ description: 'Correct answer' })
  correctAnswer: object;

  @ApiProperty({ description: 'Result' })
  explanation: string;
}

export class AssignmentDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Assignment id' })
  id?: string;

  @Transform(value => value.obj.user.toString())
  @ApiProperty({ description: 'User id' })
  user: string;

  @Transform(value => value.obj.teacher.toString())
  @ApiProperty({ description: 'User id' })
  teacher: string;

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

  @ApiProperty({ type: QuestionResultDto, description: 'Result' })
  detail: QuestionResultDto[];
}
