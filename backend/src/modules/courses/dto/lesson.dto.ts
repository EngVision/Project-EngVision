import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class LessonDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Lesson id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @ApiProperty({ type: [String], description: 'Exercises' })
  exercises: string[];
}
