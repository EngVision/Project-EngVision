import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SpeakingAnswerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  text: string;
}
