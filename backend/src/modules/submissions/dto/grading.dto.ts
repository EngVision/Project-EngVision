import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GradingDto {
  @IsNumber()
  @ApiProperty({ type: Number, description: 'Grade' })
  grade: number;

  @IsString()
  @ApiProperty({ type: String, description: 'Feedback' })
  feedback: string;
}
