import { Exclude, Expose, Transform, Type } from 'class-transformer';

class ContentDto {
  @Exclude()
  _id?: string;

  @Exclude()
  correctAnswer: any;
}

export class ExerciseDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Type(() => ContentDto)
  content: string;
}