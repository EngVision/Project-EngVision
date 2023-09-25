import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';

export class LessonDto {
  @Transform(value => value.obj.id.toString())
  @ApiProperty({ type: mongoose.Types.ObjectId, description: 'Lesson id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @ApiProperty({ type: String, description: 'Title' })
  exercises: string;
}
