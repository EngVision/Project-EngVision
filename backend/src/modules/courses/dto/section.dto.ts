import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { LessonDto } from './lesson.dto';

export class SectionDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Section id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @Type(() => LessonDto)
  @ApiProperty({ type: [LessonDto], description: 'Lessons' })
  lessons: LessonDto[];
}
