import { Expose, Transform } from 'class-transformer';

export class AchievementDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  id?: string;

  @Transform(value => value.obj.user.toString())
  user?: string;
}
