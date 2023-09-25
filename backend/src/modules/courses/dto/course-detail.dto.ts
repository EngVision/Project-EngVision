import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Level } from '../enums';
import { Expose, Transform } from 'class-transformer';
import { UserBriefDto } from 'src/modules/users/dto/user-brief.dto';
import mongoose from 'mongoose';
import { ReviewDto } from 'src/modules/reviews/dto/review.dto';

export class CourseDetailDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'course id' })
  id?: string;

  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @ApiProperty({ type: UserBriefDto, description: 'teacher id' })
  teacher: UserBriefDto;

  @ApiProperty({ type: String, description: 'about' })
  about: string;

  @ApiPropertyOptional({ type: String, description: 'video url' })
  introVideo?: string;

  @Transform(value => value.obj.thumbnail.toString())
  @ApiPropertyOptional({
    type: mongoose.Types.ObjectId,
    description: 'Thumbnail',
  })
  thumbnail?: string;

  @ApiPropertyOptional({ type: Number, description: 'price' })
  price?: number;

  @ApiPropertyOptional({ type: String, description: 'level (A1/A2 ...)' })
  level?: Level;

  @ApiPropertyOptional({ type: [String], description: 'sections' })
  sections: string[];

  @ApiPropertyOptional({ type: [String], description: 'posts' })
  posts: string[];

  @ApiPropertyOptional({ type: [ReviewDto], description: 'reviews' })
  reviews: ReviewDto[];

  @ApiPropertyOptional({ type: Number, description: 'Average star' })
  avgStar?: number;
}
