import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CEFRLevel } from 'src/common/enums';

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
  @ApiPropertyOptional({ type: String, description: 'Thumbnail url' })
  thumbnail?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'Price' })
  price?: number;

  @IsOptional()
  @IsEnum(CEFRLevel)
  @ApiPropertyOptional({ enum: CEFRLevel, description: 'Level (A1/A2 ...)' })
  level?: CEFRLevel;
}
