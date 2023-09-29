import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { UserBriefDto } from 'src/modules/users/dto/user-brief.dto';

export class ReviewDetailDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Review id' })
  id?: string;

  @Type(() => UserBriefDto)
  @ApiProperty({ type: UserBriefDto, description: 'User' })
  user: UserBriefDto;

  @Transform(value => value.obj.courseId.toString())
  @ApiProperty({ type: String, description: 'Course id' })
  courseId: string;

  @ApiProperty({ type: Number, description: 'Star' })
  star: number;

  @ApiProperty({ type: String, description: 'Comment' })
  comment?: string;
}
