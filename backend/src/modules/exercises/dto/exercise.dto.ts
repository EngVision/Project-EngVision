import { Exclude, Expose, Transform, Type } from 'class-transformer';

class ContentDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Exclude()
  correctAnswer: any;
}

export class ExerciseDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Transform(value => value.obj.creator.toString())
  creator?: string;

  @Type(() => ContentDto)
  content: string;
}
