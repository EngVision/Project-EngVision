import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { CEFRLevel, ExerciseTag } from 'src/common/enums';

export class ExamDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ description: 'Exam id' })
  id?: string;

  @ApiProperty({ description: 'Title' })
  title: string;

  @ApiProperty({ description: 'Description' })
  description: string;

  @ApiProperty({ description: 'Level', enum: CEFRLevel })
  level: CEFRLevel;

  @ApiProperty({ description: 'Tags', type: [String], enum: ExerciseTag })
  tags: ExerciseTag[];

  @ApiProperty({ description: 'Exam parts' })
  parts: string[];

  @Exclude()
  course: string;

  @Exclude()
  creator: string;
}
