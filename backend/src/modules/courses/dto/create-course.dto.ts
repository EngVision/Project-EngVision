import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Level } from '../enums';

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'About' })
  about: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Video url' })
  introVideo?: number;

  @IsOptional()
  @IsMongoId()
  @ApiPropertyOptional({ type: String, description: 'Thumbnail url' })
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'Price' })
  price?: number;

  @IsOptional()
  @IsEnum(Level)
  @ApiPropertyOptional({ enum: Level, description: 'Level (A1/A2 ...)' })
  level?: Level;

  // @IsOptional()
  // @IsEnum(Level)
  // @ApiPropertyOptional({ enum: Level, description: 'Level (A1/A2 ...)' })
  // tag?: Level; []
}
