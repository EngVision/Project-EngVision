import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class courseIdDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String, description: 'id' })
  id: string;
}
