import { Exclude, Expose, Transform, Type } from 'class-transformer';

class ExportLessonExerciseDto {
  @Exclude()
  _id: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  creator: string;

  @Exclude()
  course: string;
}

export class ExportLessonDto {
  @Exclude()
  _id: string;

  @Type(() => ExportLessonExerciseDto)
  exercises: ExportLessonExerciseDto[];
}
