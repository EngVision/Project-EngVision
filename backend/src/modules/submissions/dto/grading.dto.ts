import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GradingDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Grade' })
  grade: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String, description: 'Explanation' })
  explanation: string;
}
