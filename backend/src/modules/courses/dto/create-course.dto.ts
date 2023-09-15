import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Level } from '../enums';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'teacher id' })
  teacher: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'about' })
  about: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'video url' })
  introVideo?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    type: String,
    format: 'binary',
    description: 'thumbnail',
  })
  thumbnail?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ type: Number, description: 'price' })
  price?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'level (A1/A2 ...)' })
  level?: Level;
}
