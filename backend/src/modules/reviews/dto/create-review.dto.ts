import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'course id' })
  userId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'course id' })
  courseId: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'star' })
  star: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'comment' })
  comment?: string;
}
