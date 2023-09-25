import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { LessonDto } from './lesson.dto';

export class SectionDto {
  @Transform(value => value.obj.id.toString())
  @ApiProperty({ type: mongoose.Types.ObjectId, description: 'Section id' })
  id?: mongoose.Types.ObjectId;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @ApiProperty({ type: [LessonDto], description: 'Lessons' })
  lessons: LessonDto[];
}
