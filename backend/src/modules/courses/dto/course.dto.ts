import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import mongoose from 'mongoose';
import { CEFRLevel } from 'src/common/enums';
import { UserBriefDto } from 'src/modules/users/dto/user-brief.dto';
import { MaterialsDto } from './materials.dto';

export class CourseDto {
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

  @ApiPropertyOptional({ type: Number, description: 'Average star' })
  avgStar?: number;

  @Expose({ name: 'attendanceList' })
  @Transform(value => value.obj?.attendanceList?.length)
  @ApiPropertyOptional({
    type: Number,
    description: 'Count attendance',
  })
  attendance?: number;

  @ApiPropertyOptional({ type: Number, description: 'Total lessons' })
  totalLessons?: number;

  @Exclude()
  materials: MaterialsDto;

  @Exclude()
  sections?: mongoose.Types.ObjectId[];

  @Exclude()
  posts?: mongoose.Types.ObjectId[];

  @Exclude()
  reviews?: mongoose.Types.ObjectId[];
}
