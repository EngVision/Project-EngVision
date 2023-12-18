import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { UserBriefDto } from 'src/modules/users/dto/user-brief.dto';
import mongoose from 'mongoose';
import { ReviewDetailDto } from 'src/modules/reviews/dto/review-detail.dto';
import { SectionDto } from './section.dto';
import { CEFRLevel } from 'src/common/enums';
import { MaterialsDto } from './materials.dto';

export class CourseDetailDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'user id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @Type(() => UserBriefDto)
  @ApiProperty({ type: UserBriefDto, description: 'Teacher' })
  teacher: UserBriefDto;

  @ApiProperty({ type: String, description: 'About' })
  about: string;

  @ApiPropertyOptional({ type: String, description: 'Video url' })
  introVideo?: number;

  @Transform(value => value.obj.thumbnail?.toString())
  @ApiPropertyOptional({
    type: mongoose.Types.ObjectId,
    description: 'Thumbnail',
  })
  thumbnail?: string;

  @ApiPropertyOptional({ type: Number, description: 'price' })
  price?: number;

  @ApiPropertyOptional({ type: String, description: 'Level (A1/A2 ...)' })
  level?: CEFRLevel;

  @Expose({ name: 'attendanceList' })
  @Transform(value => value.obj?.attendanceList?.length)
  @ApiPropertyOptional({
    type: Number,
    description: 'Count attendance',
  })
  attendance?: number;

  @Type(() => ReviewDetailDto)
  @ApiProperty({ type: [ReviewDetailDto], description: 'Reviews' })
  reviews?: ReviewDetailDto[];

  @Type(() => SectionDto)
  @ApiProperty({ type: [SectionDto], description: 'sections' })
  sections?: SectionDto[];

  @ApiPropertyOptional({ type: Number, description: 'Average star' })
  avgStar?: number;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'True if user attended course',
  })
  isAttended?: boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'True if user has reviewed this course',
  })
  isReviewed?: boolean;

  @Type(() => MaterialsDto)
  @ApiPropertyOptional({
    type: MaterialsDto,
    description: 'Materials',
  })
  materials?: MaterialsDto;

  @Exclude()
  posts?: mongoose.Types.ObjectId[];
}
