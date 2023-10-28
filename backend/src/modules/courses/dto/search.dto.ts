import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { QueryDto } from 'src/common/dto/query.dto';
import { Order, StatusCourseSearch } from 'src/common/enums';

export class SearchCourseDto extends QueryDto {
  @IsNotEmpty()
  @IsEnum(StatusCourseSearch)
  @ApiPropertyOptional({
    enum: StatusCourseSearch,
    description: 'Status courses',
  })
  status?: StatusCourseSearch;

  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'Title' })
  keyword?: string;

  @IsOptional()
  @ApiPropertyOptional({ type: String, description: 'Tag' }) // is []
  tag?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional({ type: Date, description: 'Date start' })
  dateStart?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @ApiPropertyOptional({ type: Date, description: 'Date end' })
  dateEnd?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'Price min' })
  priceMin?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'Price max' })
  priceMax?: number;
}
