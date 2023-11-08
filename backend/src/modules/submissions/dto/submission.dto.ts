import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ExerciseType, SubmissionStatus } from 'src/common/enums';

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

class ExerciseDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Exercise id' })
  id?: string;

  @ApiProperty({ description: 'Exercise name' })
  title: string;
}

class UserDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'User id' })
  id?: string;

  @ApiProperty({ description: 'First name' })
  firstName: string;

  @ApiProperty({ description: 'Last name' })
  lastName: string;

  @Transform(value => value.obj.avatar.toString())
  @ApiProperty({ description: 'User avatar' })
  avatar: string;
}

class CourseDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Course id' })
  id?: string;

  @ApiProperty({ description: 'Course name' })
  title: string;

  @Exclude()
  sections: any[];
}

class SectionDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Section id' })
  id?: string;

  @ApiProperty({ description: 'Section name' })
  title: string;

  @Exclude()
  lessons: any[];
}

class LessonDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Lesson id' })
  id?: string;

  @ApiProperty({ description: 'Lesson name' })
  title: string;

  @Exclude()
  exercises: any[];
}

export class SubmissionDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Submission id' })
  id?: string;

  @Type(() => UserDto)
  @ApiProperty({ description: 'User' })
  user: UserDto;

  @Type(() => UserDto)
  @ApiProperty({ description: 'Teacher' })
  teacher: UserDto;

  @Type(() => CourseDto)
  @ApiProperty({ description: 'Course' })
  course?: CourseDto;

  @Type(() => SectionDto)
  @ApiProperty({ description: 'Section' })
  section?: SectionDto;

  @Type(() => LessonDto)
  @ApiProperty({ description: 'Lesson' })
  lesson?: LessonDto;

  @ApiPropertyOptional({ description: 'Exercise grade' })
  grade?: number;

  @Exclude()
  @ApiPropertyOptional({ description: 'Exercise need grade' })
  needGrade?: boolean;

  @Type(() => ExerciseDto)
  @ApiProperty({ description: 'Exercise' })
  exercise: ExerciseDto;

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

  @ApiProperty({ description: 'Submission status', enum: SubmissionStatus })
  status?: SubmissionStatus;

  @Type(() => QuestionResultDto)
  @ApiProperty({ type: QuestionResultDto, description: 'Result' })
  detail: QuestionResultDto[];
}
