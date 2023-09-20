import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class ReviewDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Review id' })
  id?: string;

  @ApiProperty({ type: String, description: 'User id' })
  user: string;

  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'Course id' })
  courseId: string;

  @ApiProperty({ type: Number, description: 'Star' })
  star: number;

  @ApiProperty({ type: String, description: 'Comment' })
  comment?: string;
}
