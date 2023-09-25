import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Level } from '../enums';
import { Expose, Transform } from 'class-transformer';
import mongoose from 'mongoose';
import { UserBriefDto } from 'src/modules/users/dto/user-brief.dto';

export class CourseDto {
  @Expose({ name: '_id' })
  @Transform(value => value.obj._id.toString())
  @ApiProperty({ type: String, description: 'user id' })
  id?: string;

  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @ApiProperty({ type: UserBriefDto, description: 'Teacher' })
  teacher: UserBriefDto;

  @ApiProperty({ type: String, description: 'About' })
  about: string;

  @ApiPropertyOptional({ type: String, description: 'Video url' })
  introVideo?: number;

  @Transform(value => value.obj.thumbnail.toString())
  @ApiPropertyOptional({
    type: mongoose.Types.ObjectId,
    description: 'Thumbnail',
  })
  thumbnail?: string;

  @ApiPropertyOptional({ type: Number, description: 'price' })
  price?: number;

  @ApiPropertyOptional({ type: String, description: 'Level (A1/A2 ...)' })
  level?: Level;

  @ApiPropertyOptional({ type: Number, description: 'Average star' })
  avgStar?: number;
}
