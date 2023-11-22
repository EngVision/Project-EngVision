import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { CEFRLevel } from 'src/common/enums';
import { ExerciseDto } from './exercise.dto';
import { UserBriefDto } from 'src/modules/users/dto/user-brief.dto';

export class CourseExercisesDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'user id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @Type(() => UserBriefDto)
  @ApiProperty({ type: UserBriefDto, description: 'Teacher' })
  teacher: UserBriefDto;

  @Transform(value => value.obj.thumbnail?.toString())
  @ApiProperty({
    type: mongoose.Types.ObjectId,
    description: 'Thumbnail',
  })
  thumbnail?: string;

  @ApiProperty({ type: String, description: 'Level (A1/A2 ...)' })
  level?: CEFRLevel;

  @Expose({ name: 'attendanceList' })
  @Transform(value => value.obj?.attendanceList?.length)
  @ApiProperty({
    type: Number,
    description: 'Count attendance',
  })
  attendance?: number;

  @Type(() => ExerciseDto)
  @ApiProperty({
    type: Number,
    description: 'Exercises',
  })
  exercises?: ExerciseDto[];

  @ApiProperty({
    type: Number,
    description: 'Total lessons',
  })
  totalLessons?: number;

  @ApiProperty({
    type: Number,
    description: 'Number exercise not expired',
  })
  ongoingExercises?: number;

  @ApiProperty({
    type: Number,
    description: 'Number expired exercises',
  })
  dueExercises?: number;
}
