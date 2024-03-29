import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { ExerciseDto } from '.';
import { FileDto } from 'src/modules/files/dto/file.dto';

export class LessonDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Lesson id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @Type(() => ExerciseDto)
  @ApiProperty({ type: [ExerciseDto], description: 'Exercises' })
  exercises: ExerciseDto[];

  @Type(() => FileDto)
  @ApiProperty({ type: [FileDto], description: 'Exercises' })
  materials: FileDto[];
}
