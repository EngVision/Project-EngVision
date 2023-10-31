import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Order, SortBy } from '../enums';

export class QueryDto {
  @IsOptional()
  @IsEnum(SortBy)
  @ApiPropertyOptional({ enum: SortBy, description: 'Sort by (default time)' })
  sortBy?: SortBy = SortBy.time;

  @IsOptional()
  @IsEnum(Order)
  @ApiPropertyOptional({
    enum: Order,
    description:
      'order (asc for low(old) to high(new), desc for high(new) to low(old))',
  })
  order?: Order = Order.asc;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'Page' })
  page?: number = 0;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiPropertyOptional({ type: Number, description: 'Limit' })
  limit?: number = 20;
}
