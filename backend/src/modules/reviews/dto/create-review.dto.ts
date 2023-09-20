import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Star' })
  star: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: String, description: 'Comment' })
  comment?: string;
}
