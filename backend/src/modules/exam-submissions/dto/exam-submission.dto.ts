import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { SubmissionDto } from '../../submissions/dto/submission.dto';

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

class ExamDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Exam id' })
  id?: string;

  @ApiProperty({ description: 'Exam name' })
  title: string;
}

export class ExamSubmissionDto {
  @Type(() => UserDto)
  @ApiProperty({ description: 'User' })
  user: UserDto;

  @Type(() => ExamDto)
  @ApiProperty({ description: 'Exam' })
  exam?: ExamDto;

  @ApiProperty({ description: 'Total question' })
  totalQuestion: number;

  @ApiProperty({ description: 'Total done' })
  totalDone: number;

  @ApiProperty({ description: 'Total correct question' })
  totalCorrect: number;

  @ApiProperty({ description: 'Total grade' })
  grade: number;

  @ApiProperty({ description: 'Need grade' })
  needGrade: boolean;

  @ApiProperty({ description: 'Exam progress' })
  progress?: number;

  @Type(() => SubmissionDto)
  @ApiProperty({ description: 'List submission', type: [SubmissionDto] })
  submissions: SubmissionDto[];
}
